import React from 'react'
import { Box, BoxProps, Flex, Text } from '@chakra-ui/react'

import type { BaseNotifier } from '../notifier'
import { containerErrorsStore } from '../../WizardMaster/store'
import { ToClipboard } from './ToClipboard'
import { Label } from './Label'

interface WidgetWrapperProps {
  style: object
  helpText?: string
  children: JSX.Element[] | JSX.Element
  copyValue?: Function
  useClipboard?: boolean
  notifier?: BaseNotifier
  name?: string
  description?: string | JSX.Element
  required?: boolean
  containerProps?: BoxProps
}

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
  containerProps,
}: WidgetWrapperProps): JSX.Element => {
  const hasError = containerErrorsStore.getState().filter(({ widgetName }) => widgetName === name).length > 0

  return (
    <Box {...style} data-name={name}>
      {(helpText || useClipboard) && (
        <Flex mt={5} alignItems="center" flexShrink={0}>
          {helpText && <Label isRequired={required}>{helpText}</Label>}
          {useClipboard && <ToClipboard ml={1} value={copyValue} notifier={notifier} />}
        </Flex>
      )}
      <Box
        borderColor={hasError ? 'red.500' : undefined}
        mt={2}
        borderWidth={hasError ? 1 : 0}
        borderRadius={3}
        {...containerProps}
      >
        {children}
      </Box>
      {description && (
        <Text mt={2} fontSize="sm" lineHeight="5" color="gray.500">
          {description}
        </Text>
      )}
    </Box>
  )
}

export { WidgetWrapper }
