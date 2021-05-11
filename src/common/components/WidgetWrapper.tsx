import React from 'react'

import { Box, Flex, Text } from '@chakra-ui/core'
import { Copy } from 'react-feather'
import type { BaseNotifier } from '../notifier'
import { containerErrorsStore } from '../../WizardMaster/store'

const WidgetLabel = ({ helpText, isRequired }: { helpText: string; isRequired: boolean }): JSX.Element => (
  <>
    <Text>{helpText}</Text>
    {isRequired && (
      <Text color="#858793" fontSize="0.85em" ml={2}>
        Обязательное
      </Text>
    )}
  </>
)

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
  required = false,
}: {
  style: object
  helpText?: string
  children: JSX.Element[] | JSX.Element
  copyValue?: Function
  useClipboard?: boolean
  notifier?: BaseNotifier
  name?: string
  description?: string | JSX.Element
  required?: boolean
}): JSX.Element => {
  const handleClipboard = (): void => {
    if (copyValue) {
      navigator.clipboard.writeText(copyValue())
      if (notifier) notifier.notifySuccess('Скопировано в буфер обмена')
    }
  }

  const hasError = containerErrorsStore.getState().filter(({ widgetName }) => widgetName === name).length > 0

  return (
    <Box {...style} data-name={name}>
      <Flex mt={5} alignItems="center" flexShrink={0}>
        {helpText && <WidgetLabel helpText={helpText} isRequired={required} />}
        {useClipboard && (
          <Box as={Copy} size="1em" ml={5} display="inline" color="blue.500" onClick={handleClipboard} />
        )}
        {description || ''}
      </Flex>
      <Box borderColor={hasError ? 'red.500' : null} borderWidth={hasError ? 1 : 0} borderRadius={3}>
        {children}
      </Box>
    </Box>
  )
}

export { WidgetWrapper }
