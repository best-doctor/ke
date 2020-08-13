import * as React from 'react'

import { Box, FormLabel } from '@chakra-ui/core'
import AsyncSelect from 'react-select/async'
import * as debouncePromise from 'debounce-promise'
import type { ValueType } from 'react-select/src/types'

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
  detailObject: object
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
  [key: string]: string
}

const MultiSelectWidget = (props: MultiSelectWidgetProps): JSX.Element => {
  const { name, targetPayload, provider, dataSource, optionLabel, optionValue, style, helpText } = props
  const debounceValue = 500

  const loadOptions = (inputValue: string): Promise<object> => {
    return new Promise((resolve) => {
      resolve(
        provider.getList(`${dataSource}?search=${inputValue}`).then(([data, ,]: [object, object, object]) => data)
      )
    })
  }

  const debouncedLoadOptions = debouncePromise(loadOptions, debounceValue)

  const handleChange = (value: ValueType<MultiSelectValue[]>): void => {
    let payloadIds: (string | number | undefined)[] = []

    if (value) {
      payloadIds = (value as MultiSelectValue[]).map((element: MultiSelectValue) => element.uuid || element.id)
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
        onChange={(value: ValueType<MultiSelectValue[]>) => handleChange(value)}
        loadOptions={debouncedLoadOptions}
        isClearable
        isMulti
        menuPortalTarget={document.body}
        styles={{ menuPortal: (base: object) => ({ ...base, zIndex: 9999 }) }}
        getOptionLabel={(option: object) => optionLabel(option)}
        getOptionValue={(option: object) => optionValue(option)}
      />
    </Box>
  )
}

export { MultiSelectWidget }
