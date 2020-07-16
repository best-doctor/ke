import * as React from 'react'
import { DebounceInput } from 'react-debounce-input'
import { Textarea, Box, FormLabel } from '@chakra-ui/core'
import { getData, getWidgetContent, getPayload } from '../utils/dataAccess'

import type { BaseProvider } from '../admin/providers'
import type { GenericAccessor } from '../typing'

type InputWidgetProps = {
  name: string
  helpText: string
  detailObject: any
  displayValue: GenericAccessor
  dataTarget: GenericAccessor
  targetPayload: GenericAccessor
  setObject: Function
  notifier: Function
  provider: BaseProvider
  style: any
}

const InputWidget = ({
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
}: InputWidgetProps): JSX.Element => {
  const targetUrl = getData(dataTarget, detailObject) || detailObject.url
  const content = getWidgetContent(name, detailObject, displayValue)

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
        onChange={(e) => {
          provider.put(targetUrl, getPayload(e, name, targetPayload)).then(
            (updatedObject: any) => {
              setObject(updatedObject)
              notifier('success')
            },
            () => notifier('error')
          )
        }}
      />
    </Box>
  )
}

export { InputWidget }
