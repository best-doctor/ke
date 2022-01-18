import React, { useState } from 'react'
import InputMask, { Props as InputMaskProps } from 'react-input-mask'
import { Box } from '@chakra-ui/react'

import styled from 'styled-components'
import DatePicker from 'react-datepicker'
import { useHistory, useLocation } from 'react-router-dom'
import { format } from 'date-fns'
import type { Location, History } from 'history'

import 'react-datepicker/dist/react-datepicker.css'

import classNames from 'classnames'
import { DebounceInput } from '@components/controls'
import { EventNameEnum, pushAnalytics, getCommonFilterAnalyticsPayload } from '../../../integration/analytics'
import { AsyncSelectWidget } from '../../../common/components/AsyncSelectWidget'

import { FilterManager } from '../../../common/filterManager'
import { Accessor } from '../../../typing'
import { Provider } from '../../../admin/providers'
import { Select } from '../../../common/components/Select'
import { ExtendedProps } from '../../../common/components/ReactSelectCustomization'

type Option = {
  text: string
}

type ValueType = {
  value: string
}

type IdType = {
  id: string
}

type OptionIdType = Option & IdType
type OptionValueType = Option & ValueType
type DatePickerValue = Date | [Date | null, Date | null] | null

type FilterProps = {
  name: string
  label: string
  resourceName: string
  gotoPage?: (page: number) => void
  className?: string
}
type ResourceFilterProps = FilterProps & {
  filterResource: string
  provider: Provider
  cacheTime?: number
}
type BooleanFilterProps = FilterProps & {
  trueValue?: string
  trueText?: string
  falseValue?: string
  falseText?: string
}
export interface ForeignKeySelectFilterProps extends ResourceFilterProps, ExtendedProps {
  optionLabel: (value: OptionValueType | OptionValueType[]) => string
  optionValue: (value: OptionValueType | OptionValueType[]) => string
  defaultOptions?: boolean
  isMulti?: boolean
  staleTime?: Accessor<number>
}

const StyledFilter = styled.div`
  .base-styled-filter {
    border-width: 1px;
    border-color: #cbd5e0;
    border-radius: 0.25rem;
    padding: 3px;
  }
  .styled-filter {
    min-height: 40px;
    width: 300px;
  }
`

const setFilterValue = (
  location: Location,
  filterName: string,
  filterValue: Accessor<string>,
  history: History,
  setPage?: (page: number) => void
): void => {
  const filters = FilterManager.getFilters(location.search)
  filters.push({ filterName, filterOperation: undefined, value: filterValue })
  FilterManager.resetPagination(setPage)
  FilterManager.setFilters(location, filters, history)
}

const getDateFromDatePicker = (value: DatePickerValue): Date | null | undefined =>
  Array.isArray(value) ? value[0] : value

const BaseFilter = ({ className, ...params }: FilterProps): JSX.Element => {
  const { name, label, resourceName, gotoPage } = params
  const history = useHistory()
  const location = useLocation()
  const [value, setValue] = useState('')

  const handleChange = (newValue: string): void => {
    setValue(newValue)
    pushAnalytics({
      eventName: EventNameEnum.INPUT_CHANGE,
      ...getCommonFilterAnalyticsPayload(resourceName, newValue, name),
      ...params,
    })

    setFilterValue(location, name, newValue, history, gotoPage)
  }

  return (
    <DebounceInput
      className={classNames('styled-filter base-styled-filter', className)}
      onChange={handleChange}
      placeholder={`Фильтр по ${label}` as const}
      value={value}
    />
  )
}

const MaskFilter = (params: FilterProps & InputMaskProps): JSX.Element => {
  const { name, label, resourceName, gotoPage, ...maskProps } = params
  const history = useHistory()
  const location = useLocation()
  const [value, setValue] = useState('')

  const handleChange = (newValue: string): void => {
    setValue(newValue)
    pushAnalytics({
      eventName: EventNameEnum.INPUT_CHANGE,
      ...getCommonFilterAnalyticsPayload(resourceName, newValue, name),
      ...params,
    })

    setFilterValue(location, name, newValue, history, gotoPage)
  }

  const MaskElement = (props: React.InputHTMLAttributes<HTMLInputElement>): JSX.Element => (
    <InputMask {...maskProps} {...props} />
  )

  return (
    <StyledFilter>
      <DebounceInput
        className="styled-filter base-styled-filter"
        onChange={handleChange}
        placeholder={`Фильтр по ${label}` as const}
        element={MaskElement}
        value={value}
      />
    </StyledFilter>
  )
}

const StyledMultiSelect = styled(Select)`
  min-width: 300px;
`

const MultiSelectFilter = (params: ResourceFilterProps): JSX.Element => {
  const [options, setOptions] = React.useState<any>([])
  const [storedOptions, setStoredOptions] = React.useState<Model[]>([])
  const { name, label, filterResource, resourceName, gotoPage, provider, cacheTime, className } = params
  const history = useHistory()
  const location = useLocation()

  React.useEffect(() => {
    provider.getList(filterResource, null, null, cacheTime).then((result) => setStoredOptions(result))
  }, [cacheTime, filterResource, provider])

  React.useEffect(() => {
    setOptions(storedOptions)
  }, [storedOptions])

  const getFilteredOptions = (selectedValueId: string): unknown[] => {
    const filteredOptions = storedOptions.filter((element) => element.parent === parseInt(selectedValueId, 10))

    return filteredOptions
  }

  const handleChange = (value: [IdType]): void => {
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

    setFilterValue(location, name, selectedValueId, history, gotoPage)
  }

  return (
    <StyledMultiSelect
      className={className}
      onChange={(value: any) => handleChange(value)}
      isMulti
      isClearable
      options={options}
      getOptionLabel={(option: OptionIdType) => option.text}
      getOptionValue={(option: OptionIdType) => option.id}
      placeholder={`Фильтр по ${label}`}
    />
  )
}

const SelectFilter = (params: ResourceFilterProps): JSX.Element => {
  const { name, label, resourceName, filterResource, gotoPage, provider, cacheTime } = params
  const history = useHistory()
  const location = useLocation()
  const [options, setOptions] = React.useState<any>([])

  const handleChange = (value: ValueType): void => {
    const filterValue = value ? value.value : ''

    pushAnalytics({
      eventName: EventNameEnum.SELECT_OPTION_CHANGE,
      ...getCommonFilterAnalyticsPayload(resourceName, filterValue, name),
      ...params,
    })

    setFilterValue(location, name, filterValue, history, gotoPage)
  }

  React.useEffect(() => {
    provider.getList(filterResource, null, null, cacheTime).then((result) => setOptions(result))
  }, [cacheTime, filterResource, provider])

  return (
    <StyledFilter>
      <Select
        className="styled-filter"
        onChange={(value: any) => handleChange(value)}
        options={options}
        isClearable
        getOptionLabel={(option: OptionValueType) => option.text}
        getOptionValue={(option: OptionValueType) => option.value}
        placeholder={`Фильтр по ${label}`}
      />
    </StyledFilter>
  )
}

const BooleanFilter = (params: BooleanFilterProps): JSX.Element => {
  const {
    name,
    label,
    resourceName,
    trueValue = 'true',
    trueText = 'Да',
    falseValue = 'false',
    falseText = 'Нет',
    gotoPage,
  } = params
  const history = useHistory()
  const location = useLocation()
  const options = [
    { value: trueValue, text: trueText },
    { value: falseValue, text: falseText },
  ]

  const handleChange = (value: ValueType): void => {
    const filterValue = value ? value.value : ''

    pushAnalytics({
      eventName: EventNameEnum.SELECT_OPTION_CHANGE,
      ...getCommonFilterAnalyticsPayload(resourceName, filterValue, name),
      ...params,
    })

    setFilterValue(location, name, filterValue, history, gotoPage)
  }

  return (
    <StyledFilter>
      <Select
        className="styled-filter"
        onChange={(value: any) => handleChange(value)}
        options={options}
        isClearable
        getOptionLabel={(option: OptionValueType) => option.text}
        getOptionValue={(option: OptionValueType) => option.value}
        placeholder={`Фильтр по ${label}`}
      />
    </StyledFilter>
  )
}

const ForeignKeySelectFilter = (params: ForeignKeySelectFilterProps): JSX.Element => {
  const {
    name,
    label,
    resourceName,
    provider,
    filterResource,
    optionLabel,
    optionValue,
    defaultOptions = false,
    isMulti = false,
    gotoPage,
    staleTime,
    className,
    componentsClasses,
  } = params
  const history = useHistory()
  const location = useLocation()
  const isClearable = true
  const [value, setValue] = React.useState<object | null>(null)

  const handleChange = (changeValue: []): void => {
    setValue(changeValue)
    let filterValue
    if (!changeValue) {
      filterValue = ''
    } else if (isMulti) {
      filterValue = changeValue.map((option: OptionValueType) => optionValue(option)).join(',')
    } else {
      filterValue = optionValue(changeValue)
    }

    pushAnalytics({
      eventName: EventNameEnum.SELECT_OPTION_CHANGE,
      ...getCommonFilterAnalyticsPayload(resourceName, filterValue, name),
      ...params,
    })

    setFilterValue(location, name, filterValue, history, gotoPage)
  }

  return (
    <StyledFilter>
      <Box className="styled-filter">
        <AsyncSelectWidget
          provider={provider}
          dataResourceUrl={filterResource}
          handleChange={handleChange}
          value={value}
          isClearable={isClearable}
          defaultOptions={defaultOptions}
          getOptionLabel={optionLabel}
          getOptionValue={optionValue}
          placeholder={`Фильтр по ${label}`}
          isMulti={isMulti}
          staleTime={staleTime}
          className={className}
          componentsClasses={componentsClasses}
        />
      </Box>
    </StyledFilter>
  )
}

interface DateTimeFilterProps extends FilterProps {
  filterDate?: (date: Date) => boolean
  filterTime?: (date: Date) => boolean
}

const DateFilter = (params: DateTimeFilterProps): JSX.Element => {
  const [currentDate, setCurrentDate] = React.useState<Date | null | undefined>()
  const { name, label, resourceName, gotoPage, filterDate, filterTime } = params
  const history = useHistory()
  const location = useLocation()

  const handleChange = (value: DatePickerValue): void => {
    const singleValue = getDateFromDatePicker(value)
    const filterValue = singleValue ? format(singleValue, 'yyyy-MM-dd') : ''

    pushAnalytics({
      eventName: EventNameEnum.DATE_CHANGE,
      ...getCommonFilterAnalyticsPayload(resourceName, filterValue, name),
      ...params,
    })

    setFilterValue(location, name, filterValue, history, gotoPage)
    setCurrentDate(singleValue)
  }

  return (
    <StyledFilter>
      <DatePicker
        className="styled-filter base-styled-filter"
        onChange={(value) => handleChange(value)}
        selected={currentDate}
        dateFormat="yyyy-MM-dd"
        placeholderText={`Фильтр по ${label}`}
        filterDate={filterDate}
        filterTime={filterTime}
      />
    </StyledFilter>
  )
}

const DateTimeFilter = (params: DateTimeFilterProps): JSX.Element => {
  const [currentDate, setCurrentDate] = React.useState<Date | null | undefined>()
  const { name, label, resourceName, gotoPage, filterDate, filterTime } = params
  const history = useHistory()
  const location = useLocation()

  const handleChange = (value: DatePickerValue): void => {
    const singleValue = getDateFromDatePicker(value)
    const filterValue = singleValue ? format(singleValue, "yyyy-MM-dd'T'HH:mm:ss") : ''

    pushAnalytics({
      eventName: EventNameEnum.DATETIME_CHANGE,
      ...getCommonFilterAnalyticsPayload(resourceName, filterValue, name),
      ...params,
    })

    setFilterValue(location, name, filterValue, history, gotoPage)
    setCurrentDate(singleValue)
  }

  return (
    <StyledFilter>
      <DatePicker
        className="styled-filter base-styled-filter"
        onChange={(value) => handleChange(value)}
        showTimeSelect
        selected={currentDate}
        dateFormat="yyyy-MM-dd HH:mm:ss"
        placeholderText={`Фильтр по ${label}`}
        filterDate={filterDate}
        filterTime={filterTime}
      />
    </StyledFilter>
  )
}

export {
  BaseFilter,
  BooleanFilter,
  MultiSelectFilter,
  SelectFilter,
  DateFilter,
  DateTimeFilter,
  MaskFilter,
  ForeignKeySelectFilter,
}
