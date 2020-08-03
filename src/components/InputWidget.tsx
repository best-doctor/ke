import * as React from 'react'
import { DebounceInput } from 'react-debounce-input'
import { Textarea, Box, FormLabel } from '@chakra-ui/core'
import { getData, getWidgetContent, getPayload } from '../utils/dataAccess'
import { EventNameEnum, WidgetTypeEnum } from '../integration/analytics/firebase/enums'
import { pushAnalytics } from '../integration/analytics'

import type { BaseProvider } from '../admin/providers'
import type { GenericAccessor } from '../typing'
import type { BaseAnalytic } from '../integration/analytics/base'

type InputWidgetProps = {
  name: string
  helpText: string
  resource: string
  detailObject: any
  analytics: BaseAnalytic | undefined
  widgetAnalytics: Function | boolean | undefined
  displayValue: GenericAccessor
  dataTarget: GenericAccessor
  targetPayload: GenericAccessor
  setObject: Function
  notifier: Function
  provider: BaseProvider
  viewType: string
  style: any
}

const InputWidget = (props: InputWidgetProps): JSX.Element => {
  const {
    name,
    helpText,
    detailObject,
    setObject,
    displayValue,
    dataTarget,
    targetPayload,
    notifier,
    provider,
    style,
  } = props

  const targetUrl = getData(dataTarget, detailObject) || detailObject.url
  const content = getWidgetContent(name, detailObject, displayValue)

  const handleChange = (e: any): void => {
    pushAnalytics({ eventName: EventNameEnum.INPUT_CHANGE, widgetType: WidgetTypeEnum.INPUT, value: e, ...props })

    provider.put(targetUrl, getPayload(e, name, targetPayload)).then(
      (updatedObject: any) => {
        setObject(updatedObject)
        notifier('success')
      },
      () => notifier('error')
    )
  }

  return (
    <Box {...style}>
      <FormLabel mt={5}>{helpText}</FormLabel>
      <DebounceInput
        value={content}
        resize="none"
        height={263}
        borderWidth="2px"
        borderColor="gray.300"
        debounceTimeout={1000}
        element={Textarea as React.FC}
        onChange={(e) => handleChange(e)}
      />
    </Box>
  )
}

export { InputWidget }
