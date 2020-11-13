import * as React from 'react'

import { Box, FormLabel } from '@chakra-ui/core'
import { FiCopy } from 'react-icons/fi'
import type { BaseNotifier } from '../notifier'

const WidgetWrapper = ({
  style,
  helpText,
  children,
  copyValue,
  useClipboard,
  notifier,
}: {
  style: object
  helpText?: string
  children: JSX.Element[] | JSX.Element
  copyValue?: Function
  useClipboard?: boolean
  notifier?: BaseNotifier
}): JSX.Element => {
  const handleClipboard = (): void => {
    if (copyValue) {
      navigator.clipboard.writeText(copyValue())
      if (notifier) notifier.notifySuccess('Скопировано в буфер обмена')
    }
  }

  return (
    <Box {...style}>
      <FormLabel mt={5}>
        {helpText || ''}
        {useClipboard && (
          <Box as={FiCopy} size="1em" ml={5} display="inline" color="blue.500" onClick={handleClipboard} />
        )}
      </FormLabel>
      {children}
    </Box>
  )
}

export { WidgetWrapper }
