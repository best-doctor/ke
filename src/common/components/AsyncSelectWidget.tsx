import React, { useState } from 'react'

import AsyncPaginate, { AsyncResult } from 'react-select-async-paginate'
import debouncePromise from 'debounce-promise'

import type { ValueType } from 'react-select'
import { Pagination } from '../../admin/providers/pagination'
import type { Provider } from '../../admin/providers/interfaces'
import { Accessor } from '../../typing'
import { getAccessor } from '../../DetailView/utils/dataAccess'

type AsyncSelectWidgetProps = {
  provider: Provider
  dataResourceUrl: string
  handleChange: Function
  value: object | null
  getOptionLabel: Function
  getOptionValue: Function
  styles?: object
  isClearable?: boolean
  isMulti?: boolean
  defaultOptions?: boolean
  closeMenuOnSelect?: boolean
  searchParamName?: string
  placeholder?: string
  cacheTime?: number
  getOptionLabelMenu?: (option: object | object[] | null) => string
  getOptionLabelValue?: (option: object | object[] | null) => string
  additionalValues?: object[]
}

type LoadOptionsType = {
  options: Accessor<object[]>
  hasMore: boolean
  additional?: Function
}

/**
 * Create select component with async loading options filtered by input text
 *
 * @param provider - used for requests to backend
 * @param dataResourceUrl - options resource URL
 * @param handleChange - callback for select value changes
 * @param value - initial value
 * @param getOptionLabel - function will get every option model and should return label
 * @param getOptionLabelMenu - function will get every option model and should return label for meny items display
 * @param getOptionLabelValue - function will get every option model and should return label for value display
 * @param getOptionValue - function will get every option model and should return value
 * @param styles - react-select styles
 * @param isClearable - add clickable icon for select clear
 * @param isMulti - enable multiselect
 * @param defaultOptions - if array, when used as initial models for options list, if true when fire load options on render, else waiting for input
 * @param searchParamName - url parameter name which will be used with input value on options requests to backend
 * @param placeholder - text for empty select
 * @param additionalValues - some fixed values to be added into options as Accessor
 */
const AsyncSelectWidget = ({
  provider,
  dataResourceUrl,
  handleChange,
  value,
  getOptionLabel,
  getOptionValue,
  styles,
  isClearable = false,
  isMulti = false,
  defaultOptions = false,
  searchParamName = 'search',
  placeholder = 'Введите значение',
  getOptionLabelMenu,
  getOptionLabelValue,
  additionalValues = [],
}: AsyncSelectWidgetProps): JSX.Element => {
  const debounceValue = 500

  const widgetStyles = {
    ...{
      menuPortal: (base: object) => ({ ...base, zIndex: 9999 }),
    },
    ...(styles !== undefined ? styles : {}),
  }

  const [nextUrl, setNextUrl] = useState<string | null | undefined>('')
  const [cachedChangeValue, setCachedChangeValue] = useState<string>('')
  const [usedAdditionalValues, setUsedAdditionalValues] = useState(false)

  React.useEffect(() => {
    setNextUrl('')
  }, [dataResourceUrl])

  const getUrl = (changeValue: string): string => {
    const url = new URL(dataResourceUrl)
    url.searchParams.append(searchParamName, changeValue)
    return url.href
  }

  const getOptionsHandler = async (url: string, changeValue: string): Promise<LoadOptionsType> => {
    const res = await provider.getPage(url).then(([data, , meta]: [object[], object, Pagination]) => {
      setCachedChangeValue(changeValue)
      meta.nextUrl && setNextUrl(meta.nextUrl)
      return {
        options: data,
        hasMore: !!meta.nextUrl,
      }
    })
    return res
  }

  const loadOptions = async (changeValue: string): Promise<AsyncResult<LoadOptionsType>> => {
    let url = getUrl(changeValue)
    if (changeValue === cachedChangeValue && nextUrl) {
      url = nextUrl
    }
    const res = await getOptionsHandler(url, changeValue)
    if (!usedAdditionalValues && Array.isArray(res.options)) {
      const values = getAccessor(additionalValues)
      res.options = values.concat(res.options)
      setUsedAdditionalValues(true)
    }
    return res as AsyncResult<LoadOptionsType>
  }

  const debouncedLoadOptions = debouncePromise(loadOptions, debounceValue)

  const formatOptionLabel = (
    option: object | object[] | null,
    { context }: { context: 'menu' | 'value' }
  ): string | null => {
    if (!option) {
      return option
    }
    if (context === 'menu') {
      return getOptionLabelMenu ? getOptionLabelMenu(option) : getOptionLabel(option)
    }
    return getOptionLabelValue ? getOptionLabelValue(option) : getOptionLabel(option)
  }

  return (
    <AsyncPaginate
      value={value}
      onChange={(changeValue: ValueType<object | object[], boolean>) => handleChange(changeValue)}
      loadOptions={debouncedLoadOptions}
      defaultOptions={defaultOptions}
      isClearable={isClearable}
      isMulti={isMulti as false | undefined}
      menuPortalTarget={document.body}
      styles={widgetStyles}
      formatOptionLabel={formatOptionLabel}
      getOptionValue={(option: object | object[] | null) => (option ? getOptionValue(option) : option)}
      placeholder={placeholder}
      cacheUniq={dataResourceUrl}
    />
  )
}

export { AsyncSelectWidget }
