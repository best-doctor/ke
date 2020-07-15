import * as React from 'react'
import AsyncSelect from 'react-select/async'
import { Box, FormLabel } from '@chakra-ui/core'
import * as debouncePromise from 'debounce-promise'

import { getData } from '../utils/dataAccess'
import type { BaseProvider } from '../admin/providers'

const ForeignKeySelect = ({
  provider,
  dataResourceUrl,
  handleChange,
  placeholder,
  getOptionLabel,
  getOptionValue,
}: {
  provider: BaseProvider
  dataResourceUrl: string
  handleChange: Function
  placeholder: string
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

type ForeignKeySelectWidgetProps = {
  detailObject: any
  provider: BaseProvider
  helpText: string
  displayValue: string | Function
  targetPayload: Function
  dataSource: string
  dataTarget: string | Function
  optionLabel: Function
  optionValue: Function
  setObject: Function
  notifier: Function
  style: any
}

const ForeignKeySelectWidget = ({
  detailObject,
  provider,
  helpText,
  setObject,
  displayValue,
  dataSource,
  dataTarget,
  targetPayload,
  optionLabel,
  optionValue,
  notifier,
  style,
}: ForeignKeySelectWidgetProps): JSX.Element => {
  const placeholder = getData(displayValue, detailObject)
  const targetUrl = getData(dataTarget, detailObject)

  const handleChange = (value: any): void => {
    provider.put(targetUrl, targetPayload(value)).then(
      (updatedObject: any) => {
        setObject(updatedObject)
        notifier('success')
      },
      () => notifier('error')
    )
  }

  return (
    <Box {...style}>
      <FormLabel>{helpText}</FormLabel>
      <ForeignKeySelect
        provider={provider}
        dataResourceUrl={dataSource}
        handleChange={handleChange}
        placeholder={placeholder}
        getOptionLabel={optionLabel}
        getOptionValue={optionValue}
      />
    </Box>
  )
}

export { ForeignKeySelect, ForeignKeySelectWidget }
