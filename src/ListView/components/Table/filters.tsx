import * as React from 'react'
import { DebounceInput } from 'react-debounce-input'
import Select from 'react-select'
import styled from 'styled-components'
import DatePicker from 'react-datepicker'
import * as moment from 'moment'
import { useHistory, useLocation } from 'react-router-dom'

import 'react-datepicker/dist/react-datepicker.css'

import { pushAnalytics } from '../../../integration/analytics/utils'
import { EventNameEnum } from '../../../integration/analytics/firebase/enums'
import { getCommonFilterAnalyticsPayload } from '../../../integration/analytics/firebase/utils'
import { StoreManager } from '../../../common/store'
import { FilterManager } from '../../../common/filterManager'

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
  const { name, label, resourceName } = params
  const history = useHistory()
  const location = useLocation()

  const handleChange = (event: any): void => {
    // eslint-disable-next-line
    const value = event.target.value

    pushAnalytics({
      eventName: EventNameEnum.INPUT_CHANGE,
      ...getCommonFilterAnalyticsPayload(resourceName, value, name),
      ...params,
    })

    setFilterValue(location, name, value, history)
  }

  return (
    <StyledFilter>
      <DebounceInput
        className="styled-filter base-styled-filter"
        debounceTimeout={1000}
        onChange={(e: any) => handleChange(e)}
        placeholder={`Фильтр по ${label}`}
      />
    </StyledFilter>
  )
}

const MultiSelectFilter = (params: any): JSX.Element => {
  const [options, setOptions] = React.useState<any>([])
  const { name, label, filterResource, resourceName } = params
  const storedOptions = StoreManager.getResource(filterResource)
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

    pushAnalytics({
      eventName: EventNameEnum.MULTISELECT_OPTION_CHANGE,
      ...getCommonFilterAnalyticsPayload(resourceName, selectedValueId, name),
      ...params,
    })

    setFilterValue(location, name, selectedValueId, history)
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
        placeholder={`Фильтр по ${label}`}
      />
    </StyledFilter>
  )
}

const SelectFilter = (params: any): JSX.Element => {
  const { name, label, resourceName } = params
  const history = useHistory()
  const location = useLocation()

  const handleChange = (value: any): void => {
    const filterValue = value ? value.value : ''

    pushAnalytics({
      eventName: EventNameEnum.SELECT_OPTION_CHANGE,
      ...getCommonFilterAnalyticsPayload(resourceName, filterValue, name),
      ...params,
    })

    setFilterValue(location, name, filterValue, history)
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
        placeholder={`Фильтр по ${label}`}
      />
    </StyledFilter>
  )
}

const DateFilter = (params: any): JSX.Element => {
  const [currentDate, setCurrentDate] = React.useState<Date | null | undefined>()
  const { name, label, resourceName } = params
  const history = useHistory()
  const location = useLocation()

  const handleChange = (value: Date | null | undefined): void => {
    const filterValue = value ? moment(value).format('YYYY-MM-DD') : ''

    pushAnalytics({
      eventName: EventNameEnum.DATE_CHANGE,
      ...getCommonFilterAnalyticsPayload(resourceName, filterValue, name),
      ...params,
    })

    setFilterValue(location, name, filterValue, history)
    setCurrentDate(value)
  }

  return (
    <StyledFilter>
      <DatePicker
        className="styled-filter base-styled-filter"
        onChange={(value: Date | null | undefined) => handleChange(value)}
        selected={currentDate}
        dateFormat="yyyy-MM-dd"
        placeholderText={`Фильтр по ${label}`}
      />
    </StyledFilter>
  )
}

const DateTimeFilter = (params: any): JSX.Element => {
  const [currentDate, setCurrentDate] = React.useState<Date | null | undefined>()
  const { name, label, resourceName } = params
  const history = useHistory()
  const location = useLocation()

  const handleChange = (value: Date | null | undefined): void => {
    const filterValue = value ? moment(value).format('YYYY-MM-DDThh:mm:ss') : ''

    pushAnalytics({
      eventName: EventNameEnum.DATETIME_CHANGE,
      ...getCommonFilterAnalyticsPayload(resourceName, filterValue, name),
      ...params,
    })

    setFilterValue(location, name, filterValue, history)
    setCurrentDate(value)
  }

  return (
    <StyledFilter>
      <DatePicker
        className="styled-filter base-styled-filter"
        onChange={(value: Date | null | undefined) => handleChange(value)}
        showTimeSelect
        selected={currentDate}
        dateFormat="yyyy-MM-dd hh:mm:ss"
        placeholderText={`Фильтр по ${label}`}
      />
    </StyledFilter>
  )
}

export { BaseFilter, MultiSelectFilter, SelectFilter, DateFilter, DateTimeFilter }
