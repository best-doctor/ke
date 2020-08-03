import * as React from 'react'
import { useEffect, useState } from 'react'
import { FormLabel, Select, Box } from '@chakra-ui/core'
import { getData, getPayload, getWidgetContent } from '../utils/dataAccess'
import { EventNameEnum, WidgetTypeEnum, pushAnalytics } from '../integration/analytics'

import type { BaseAnalytic } from '../integration/analytics'
import type { BaseProvider } from '../admin/providers'
import type { GenericAccessor } from '../typing'

type SelectObject = {
  value: string
  text: string
}

type SelectProps = {
  name: string
  resource: string
  detailObject: any
  helpText: string
  setObject: Function
  displayValue: GenericAccessor
  dataSource: string | Function
  dataTarget: GenericAccessor
  targetPayload: GenericAccessor
  provider: BaseProvider
  analytics: BaseAnalytic | undefined
  widgetAnalytics: Function | boolean | undefined
  notifier: Function
  viewType: string
  style: any
}

const SelectWidget = (props: SelectProps): JSX.Element => {
  const {
    name,
    helpText,
    displayValue,
    detailObject,
    dataSource,
    dataTarget,
    targetPayload,
    setObject,
    provider,
    style,
    notifier,
  } = props

  const sourceUrl = getData(dataSource, detailObject)
  const targetUrl = getData(dataTarget, detailObject) || detailObject.url

  const { value, text } = getWidgetContent(name, detailObject, displayValue, 'object')

  const [resultOptions, setResultOptions] = useState<SelectObject[]>([])

  useEffect(() => {
    provider.getList(sourceUrl).then(([responseOptions, ,]: [any, any, any]) => setResultOptions(responseOptions))
  }, [provider, sourceUrl])

  const handleChange = (e: any): void => {
    pushAnalytics({
      eventName: EventNameEnum.SELECT_OPTION_CHANGE,
      widgetType: WidgetTypeEnum.INPUT,
      value: e,
      ...props,
    })

    provider.put(targetUrl, getPayload(e, name, targetPayload)).then(
      (result: any) => {
        setObject(result)
        notifier('success')
      },
      () => notifier('error')
    )
  }

  return (
    <Box {...style}>
      <FormLabel mt={5}>{helpText}</FormLabel>
      <Select onChange={(e) => handleChange(e)}>
        <option value={value} selected key={value}>
          {text}
        </option>
        {resultOptions
          .filter((element) => element.value !== value)
          .map((resultOption) => (
            <option value={resultOption.value} key={resultOption.value}>
              {resultOption.text}
            </option>
          ))}
      </Select>
    </Box>
  )
}

export { SelectWidget }
