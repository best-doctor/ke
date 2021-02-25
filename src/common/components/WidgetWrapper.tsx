import React from 'react'

import { Box, FormLabel } from '@chakra-ui/core'
import { FiCopy } from 'react-icons/fi'
import type { BaseNotifier } from '../notifier'

/**
 * Standard styled container for other widgets
 *
 * @param style - container css styles
 * @param helpText - inner widget(s) description
 * @param children - standard react children
 * @param copyValue - returns of this callback will be copy to clipboard (when use)
 * @param useClipboard - show "copy-to-clipboard" handler
 * @param notifier - object for send notification text on "copy-to-clipboard" event
 */
const WidgetWrapper = ({
  style,
  helpText,
  children,
  copyValue,
  useClipboard,
  notifier,
  name = '',
}: {
  style: object
  helpText?: string
  children: JSX.Element[] | JSX.Element
  copyValue?: Function
  useClipboard?: boolean
  notifier?: BaseNotifier
  name?: string
}): JSX.Element => {
  const handleClipboard = (): void => {
    if (copyValue) {
      navigator.clipboard.writeText(copyValue())
      if (notifier) notifier.notifySuccess('Скопировано в буфер обмена')
    }
  }

  return (
    <Box {...style} data-name={name}>
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
