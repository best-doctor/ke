import React from 'react'

import AsyncSelect from 'react-select/async'
import debouncePromise from 'debounce-promise'

import type { ValueType } from 'react-select/src/types'
import type { Provider } from '../../admin/providers/interfaces'

type AsyncSelectWidgetProps = {
  provider: Provider
  dataResourceUrl: string
  handleChange: Function
  value: object | null
  getOptionLabel: Function
  getOptionValue: Function
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
  isClearable = false,
  isMulti = false,
  defaultOptions = false,
  searchParamName = 'search',
  placeholder = 'Введите значение',
}: AsyncSelectWidgetProps): JSX.Element => {
  const debounceValue = 500

  const getUrl = (changeValue: string): string => {
    const url = new URL(dataResourceUrl)
    url.searchParams.append(searchParamName, changeValue)
    return url.href
  }

  const loadOptions = (changeValue: string): Promise<object> => {
    const url = getUrl(changeValue)

    return new Promise((resolve) => {
      resolve(provider.getPage(url).then(([data, ,]: [object, object, object]) => data))
    })
  }

  const debouncedLoadOptions = debouncePromise(loadOptions, debounceValue)

  return (
    <AsyncSelect
      value={value}
      onChange={(changeValue: ValueType<object | object[]>) => handleChange(changeValue)}
      loadOptions={debouncedLoadOptions}
      defaultOptions={defaultOptions}
      isClearable={isClearable}
      isMulti={isMulti}
      menuPortalTarget={document.body}
      styles={{ menuPortal: (base: object) => ({ ...base, zIndex: 9999 }) }}
      getOptionLabel={(option: object | null) => (option ? getOptionLabel(option) : option)}
      getOptionValue={(option: object | null) => (option ? getOptionValue(option) : option)}
      placeholder={placeholder}
    />
  )
}

export { AsyncSelectWidget }
