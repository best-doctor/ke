import React from 'react'

import { Box, FormLabel } from '@chakra-ui/core'
import { Copy } from 'react-feather'
import type { BaseNotifier } from '../notifier'

/**
 * Standard styled container for other widgets
 *
 * @param style - container css styles
 * @param helpText - inner widget(s) label
 * @param children - standard react children
 * @param copyValue - returns of this callback will be copy to clipboard (when use)
 * @param useClipboard - show "copy-to-clipboard" handler
 * @param notifier - object for send notification text on "copy-to-clipboard" event
 * @param name - name data-attribute
 * @param description - description
 */
const WidgetWrapper = ({
  style,
  helpText,
  children,
  copyValue,
  useClipboard,
  notifier,
  name = '',
  description = '',
}: {
  style: object
  helpText?: string
  children: JSX.Element[] | JSX.Element
  copyValue?: Function
  useClipboard?: boolean
  notifier?: BaseNotifier
  name?: string
  description?: string | JSX.Element
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
          <Box as={Copy} size="1em" ml={5} display="inline" color="blue.500" onClick={handleClipboard} />
        )}
        {description || ''}
      </FormLabel>
      {children}
    </Box>
  )
}

export { WidgetWrapper }
