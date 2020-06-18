import * as React from 'react'
import AsyncSelect from 'react-select/async'
import * as debouncePromise from 'debounce-promise'

import type { BaseProvider } from '../admin/providers'

const ForeignKeySelect = ({
  provider,
  dataResourceUrl,
  placeholder,
  handleChange,
  getOptionLabel,
  getOptionValue,
}: {
  provider: BaseProvider
  dataResourceUrl: string
  placeholder: string
  handleChange: Function
  getOptionLabel: Function
  getOptionValue: Function
}): JSX.Element => {
  const debounceValue = 500

  const loadOptions = (inputValue: string): Promise<any> => {
    return new Promise((resolve) => {
      resolve(provider.getList(`${dataResourceUrl}?search=${inputValue}`).then(([data, ,]: [any, any, any]) => data))
    })
  }

  const debouncedLoadOptions = debouncePromise(loadOptions, debounceValue)

  return (
    <AsyncSelect
      onChange={(value: any) => handleChange(value)}
      loadOptions={debouncedLoadOptions}
      isClearable
      getOptionLabel={(option: any) => getOptionLabel(option)}
      getOptionValue={(option: any) => getOptionValue(option)}
      placeholder={placeholder}
    />
  )
}

export { ForeignKeySelect }
