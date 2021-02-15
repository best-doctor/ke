import * as React from 'react'

import AsyncSelect from 'react-select/async'
import * as debouncePromise from 'debounce-promise'

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
