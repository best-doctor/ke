import * as React from 'react'
import { DebounceInput } from 'react-debounce-input'
import Select from 'react-select'
import styled from 'styled-components'
import DatePicker from 'react-datepicker'
import * as moment from 'moment'
import { useHistory, useLocation } from 'react-router-dom'

import 'react-datepicker/dist/react-datepicker.css'

import { StoreManager } from '../../store'
import { FilterManager } from '../../utils/filterManager'

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

const setFilterValue = (location: any, filterName: any, filterValue: any, history: any): void => {
  const filters = FilterManager.getFilters(location.search)
  filters.push({ filterName, filterOperation: undefined, value: filterValue })
  FilterManager.setFilters(location, filters, history)
}

const BaseFilter = (params: any): JSX.Element => {
  const history = useHistory()
  const location = useLocation()

  const handleChange = (event: any): void => {
    // eslint-disable-next-line
    const value = event.target.value

    setFilterValue(location, params.name, value, history)
  }

  return (
    <StyledFilter>
      <DebounceInput
        className="styled-filter base-styled-filter"
        debounceTimeout={1000}
        onChange={(e: any) => handleChange(e)}
        placeholder={`Фильтр по ${params.label}`}
      />
    </StyledFilter>
  )
}

const MultiSelectFilter = (params: any): JSX.Element => {
  const [options, setOptions] = React.useState<any>([])
  const storedOptions = StoreManager.getResource(params.filterResource)
  const history = useHistory()
  const location = useLocation()

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

    setFilterValue(location, params.name, selectedValueId, history)
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
        placeholder={`Фильтр по ${params.label}`}
      />
    </StyledFilter>
  )
}

const SelectFilter = (params: any): JSX.Element => {
  const history = useHistory()
  const location = useLocation()

  const handleChange = (value: any): void => {
    const filterValue = value ? value.value : ''
    setFilterValue(location, params.name, filterValue, history)
  }

  return (
    <StyledFilter>
      <Select
        className="styled-filter"
        onChange={(value: any) => handleChange(value)}
        options={StoreManager.getResource(params.filterResource)}
        isClearable
        getOptionLabel={(option: any) => option.text}
        getOptionValue={(option: any) => option.value}
        placeholder={`Фильтр по ${params.label}`}
      />
    </StyledFilter>
  )
}

const DateFilter = (params: any): JSX.Element => {
  const [currentDate, setCurrentDate] = React.useState<any>()
  const history = useHistory()
  const location = useLocation()

  const handleChange = (value: any): void => {
    const filterValue = value ? moment(value).format('YYYY-MM-DD') : ''
    setFilterValue(location, params.name, filterValue, history)
    setCurrentDate(value)
  }

  return (
    <StyledFilter>
      <DatePicker
        className="styled-filter base-styled-filter"
        onChange={(value: any) => handleChange(value)}
        selected={currentDate}
        dateFormat="yyyy-MM-dd"
        placeholderText={`Фильтр по ${params.label}`}
      />
    </StyledFilter>
  )
}

const DateTimeFilter = (params: any): JSX.Element => {
  const [currentDate, setCurrentDate] = React.useState<any>()
  const history = useHistory()
  const location = useLocation()

  const handleChange = (value: any): void => {
    const filterValue = value ? moment(value).format('YYYY-MM-DDThh:mm:ss') : ''
    setFilterValue(location, params.name, filterValue, history)
    setCurrentDate(value)
  }

  return (
    <StyledFilter>
      <DatePicker
        className="styled-filter base-styled-filter"
        onChange={(value: any) => handleChange(value)}
        showTimeSelect
        selected={currentDate}
        dateFormat="yyyy-MM-dd hh:mm:ss"
        placeholderText={`Фильтр по ${params.label}`}
      />
    </StyledFilter>
  )
}

export { BaseFilter, MultiSelectFilter, SelectFilter, DateFilter, DateTimeFilter }
