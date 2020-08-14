import * as React from 'react'

import AsyncSelect from 'react-select/async'
import * as debouncePromise from 'debounce-promise'

import type { ValueType } from 'react-select/src/types'
import type { BaseProvider } from '../admin/providers'

type AsyncSelectWidgetProps = {
  provider: BaseProvider
  dataResourceUrl: string
  handleChange: Function
  value: object
  getOptionLabel: Function
  getOptionValue: Function
  isClearable?: boolean
  isMulti?: boolean
  searchParamName?: string
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
  searchParamName = 'search',
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
      resolve(provider.getList(url).then(([data, ,]: [object, object, object]) => data))
    })
  }

  const debouncedLoadOptions = debouncePromise(loadOptions, debounceValue)

  return (
    <AsyncSelect
      value={value}
      onChange={(changeValue: ValueType<object | object[]>) => handleChange(changeValue)}
      loadOptions={debouncedLoadOptions}
      closeMenuOnSelect={false}
      isClearable={isClearable}
      isMulti={isMulti}
      menuPortalTarget={document.body}
      styles={{ menuPortal: (base: object) => ({ ...base, zIndex: 9999 }) }}
      getOptionLabel={(option: object) => getOptionLabel(option)}
      getOptionValue={(option: object) => getOptionValue(option)}
    />
  )
}

export { AsyncSelectWidget }
