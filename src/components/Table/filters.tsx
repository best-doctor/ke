import * as React from 'react'
import { DebounceInput } from 'react-debounce-input'
import Select from 'react-select'
import styled from 'styled-components'

import { StoreManager } from '../../store'

const StyledFilter = styled.div`
  .base-styled-filter {
    border-width: 1px;
    border-color: #cbd5e0;
    border-radius: 0.25rem;
    padding: 3px;
  }
  .styled-filter {
    height: 40px;
    width: 300px;
  }
`

const setFilterValue = (column: any, filterValue: any): void => {
  column.setFilter(
    // eslint-disable-next-line
    { filterName: column.filterName, value: filterValue, filterOperation: column.filterOperation } || undefined // Set undefined to remove the filter entirely
  )
}

const BaseFilter = (columnObject: any): JSX.Element => {
  const { column }: { column: any } = columnObject
  const handleChange = (event: any): void => {
    // eslint-disable-next-line
    const value = event.target.value

    setFilterValue(column, value)
  }

  return (
    <StyledFilter>
      <DebounceInput
        className="styled-filter base-styled-filter"
        debounceTimeout={1000}
        onChange={(e: any) => handleChange(e)}
        placeholder={`Фильтр по ${column.Header}`}
      />
    </StyledFilter>
  )
}

const MultiSelectFilter = ({ column }: { column: any }): JSX.Element => {
  const [options, setOptions] = React.useState<any>([])
  const storedOptions = StoreManager.getResource(column.filterResource)

  React.useEffect(() => {
    setOptions(storedOptions)
  }, [storedOptions])

  const getFilteredOptions = (selectedValueId: string): string[] => {
    const filteredOptions = storedOptions.filter((element: any) => element.parent === parseInt(selectedValueId, 10))

    return filteredOptions
  }

  const handleChange = (value: any): void => {
    let selectedValueId = ''

    if (value && value.length > 0) {
      selectedValueId = value.slice(-1)[0].id
      const filteredOptions = getFilteredOptions(selectedValueId)
      setOptions(filteredOptions)
    } else {
      setOptions(storedOptions)
    }

    setFilterValue(column, selectedValueId)
  }

  return (
    <StyledFilter>
      <Select
        className="styled-filter"
        onChange={(value: any) => handleChange(value)}
        isMulti
        isClearable
        options={options}
        getOptionLabel={(option: any) => option.text}
        getOptionValue={(option: any) => option.id}
        placeholder={`Фильтр по ${column.Header}`}
      />
    </StyledFilter>
  )
}

const SelectFilter = ({ column }: { column: any }): JSX.Element => {
  const handleChange = (value: any): void => {
    const filterValue = value ? value.value : ''
    setFilterValue(column, filterValue)
  }

  return (
    <StyledFilter>
      <Select
        className="styled-filter"
        onChange={(value: any) => handleChange(value)}
        options={StoreManager.getResource(column.filterResource)}
        isClearable
        getOptionLabel={(option: any) => option.text}
        getOptionValue={(option: any) => option.value}
        placeholder={`Фильтр по ${column.Header}`}
      />
    </StyledFilter>
  )
}

export { BaseFilter, MultiSelectFilter, SelectFilter }
