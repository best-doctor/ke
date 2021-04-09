import React, { useState } from 'react'

import AsyncPaginate from 'react-select-async-paginate'
import debouncePromise from 'debounce-promise'

import type { ValueType } from 'react-select'
import type { Provider } from '../../admin/providers/interfaces'
import { Pagination } from 'admin/providers/pagination'

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
}

/**
 * Create select component with async loading options filtered by input text
 *
 * @param provider - used for requests to backend
 * @param dataResourceUrl - options resource URL
 * @param handleChange - callback for select value changes
 * @param value - initial value
 * @param getOptionLabel - function will get every option model and should return label
 * @param getOptionValue - function will get every option model and should return value
 * @param styles - react-select styles
 * @param isClearable - add clickable icon for select clear
 * @param isMulti - enable multiselect
 * @param defaultOptions - if array, when used as initial models for options list, if true when fire load options on render, else waiting for input
 * @param searchParamName - url parameter name which will be used with input value on options requests to backend
 * @param placeholder - text for empty select
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
}: AsyncSelectWidgetProps): JSX.Element => {
  const debounceValue = 500

  const widgetStyles = {
    ...{
      menuPortal: (base: object) => ({ ...base, zIndex: 9999 }),
    },
    ...(styles !== undefined ? styles : {}),
  }

  const getUrl = (changeValue: string): string => {
    const url = new URL(dataResourceUrl)
    url.searchParams.append(searchParamName, changeValue)
    return url.href
  }
  const [options, setOptions] = useState<object[]>([])
  const [nextUrl, setNextUrl] = useState<string | null | undefined>('')
  const getOptionsHandler = async (url: string) => {
    const res = await provider.getPage(url).then(([data, , meta]: [object, object, Pagination]) => {
      setNextUrl(meta.nextUrl)
      setOptions([...(data as [])])
      return {
        options,
        hasMore: !!meta.nextUrl,
      }
    })
    return res
  }
  const loadOptions = async (changeValue: string) => {
    const url = getUrl(changeValue)
    if (nextUrl) {
      const res = await getOptionsHandler(nextUrl)
      return res
    }
    const res = await getOptionsHandler(url)
    return res
  }

  const debouncedLoadOptions = debouncePromise(loadOptions, debounceValue)

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
      getOptionLabel={(option: object | null) => (option ? getOptionLabel(option) : option)}
      getOptionValue={(option: object | null) => (option ? getOptionValue(option) : option)}
      placeholder={placeholder}
    />
  )
}

export { AsyncSelectWidget }
