import * as React from 'react'

import { Box, FormLabel } from '@chakra-ui/core'
import AsyncSelect from 'react-select/async'
import * as debouncePromise from 'debounce-promise'

import type { BaseProvider } from 'index'
import { pushAnalytics } from '../integration/analytics'
import { EventNameEnum, WidgetTypeEnum } from '../integration/analytics/firebase/enums'
import { WrappedLocalStorage } from '../store/localStorageWrapper'
import type { BaseAnalytic } from '../integration/analytics'
import type { BaseNotifier } from '../utils/notifier'
import type { GenericAccessor } from '../typing'

type MultiSelectWidgetProps = {
  name: string
  resource: string
  detailObject: any
  useLocalStorage: boolean
  helpText: string
  setObject: Function
  displayValue: GenericAccessor
  dataSource: string | Function
  dataTarget: GenericAccessor
  targetPayload: GenericAccessor
  provider: BaseProvider
  analytics: BaseAnalytic | undefined
  widgetAnalytics: Function | boolean | undefined
  notifier: BaseNotifier
  optionLabel: Function
  optionValue: Function
  viewType: string
  style: any
}

type MultiSelectValue = {
  id?: number
  uuid?: number
  text: string
}

const MultiSelectWidget = (props: MultiSelectWidgetProps): JSX.Element => {
  const { name, targetPayload, provider, dataSource, optionLabel, optionValue, style, helpText } = props
  const debounceValue = 500

  const loadOptions = (inputValue: string): Promise<any> => {
    return new Promise((resolve) => {
      resolve(provider.getList(`${dataSource}?search=${inputValue}`).then(([data, ,]: [any, any, any]) => data))
    })
  }

  const debouncedLoadOptions = debouncePromise(loadOptions, debounceValue)

  const handleChange = (value: any): void => {
    let payloadIds = []

    if (value) {
      payloadIds = value.map((element: MultiSelectValue) => element.uuid || element.id)
    }

    const widgetPayload = (targetPayload as Function)(payloadIds)

    pushAnalytics({
      eventName: EventNameEnum.FOREIGN_KEY_SELECT_OPTION_CHANGE,
      widgetType: WidgetTypeEnum.INPUT,
      value: payloadIds,
      ...props,
    })

    WrappedLocalStorage.setItem(name, widgetPayload)
  }

  return (
    <Box {...style}>
      <FormLabel>{helpText}</FormLabel>
      <AsyncSelect
        onChange={(value: any) => handleChange(value)}
        loadOptions={debouncedLoadOptions}
        isClearable
        isMulti
        menuPortalTarget={document.body}
        styles={{ menuPortal: (base: any) => ({ ...base, zIndex: 9999 }) }}
        getOptionLabel={(option: any) => optionLabel(option)}
        getOptionValue={(option: any) => optionValue(option)}
      />
    </Box>
  )
}

export { MultiSelectWidget }
