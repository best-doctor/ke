// Это легаси
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { Box, BoxProps, Flex, Text, useStyles } from '@chakra-ui/react'

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
  labelContainerProps?: BoxProps
  className?: string
  'data-test-id'?: string
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
  labelContainerProps,
  className,
  'data-test-id': dataTestId,
}: WidgetWrapperProps): JSX.Element => {
  const error = containerErrorsStore.getState().find(({ widgetName }) => widgetName === name)
  const hasError = !!error

  return (
    <Box {...style} data-name={name} className={className} data-test-id={dataTestId}>
      {(helpText || useClipboard) && (
        <Flex mt={6} alignItems="center" flexShrink={0} {...labelContainerProps}>
          {helpText && <Label isRequired={required}>{helpText}</Label>}
          {useClipboard && <ToClipboard ml={1} value={copyValue} notifier={notifier} />}
        </Flex>
      )}
      <Box
        borderColor={hasError ? 'red.500' : undefined}
        mt={2}
        borderWidth={hasError ? 1 : 0}
        borderRadius={3}
        data-has-error={hasError}
        {...containerProps}
      >
        {children}
      </Box>
      {description && (
        <Text mt={2} fontSize="sm" lineHeight="5" color="gray.500">
          {description}
        </Text>
      )}
      {!!error && (
        <Text mt={2} fontSize="sm" lineHeight="5" color="red.500">
          {error.errorText}
        </Text>
      )}
    </Box>
  )
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
const StyledWidgetWrapper = ({
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
  labelContainerProps,
  className,
}: WidgetWrapperProps): JSX.Element => {
  const error = containerErrorsStore.getState().find(({ widgetName }) => widgetName === name)
  const hasError = !!error
  const styles = useStyles()
  const widgetWrapperStyle = { ...(styles.widgetWrapper || {}), ...(style || {}) }
  return (
    <Box sx={widgetWrapperStyle} data-name={name} className={className}>
      {(helpText || useClipboard) && (
        <Flex {...(styles.labelWrapper as any)} {...labelContainerProps}>
          {helpText && (
            <Label isRequired={required} sx={styles.label}>
              {helpText}
            </Label>
          )}
          {useClipboard && <ToClipboard ml={1} value={copyValue} notifier={notifier} />}
        </Flex>
      )}
      <Box
        borderColor={hasError ? 'red.500' : undefined}
        borderWidth={hasError ? 1 : 0}
        borderRadius={3}
        sx={styles.controlWrapper}
        data-has-error={hasError}
        {...containerProps}
      >
        {children}
      </Box>
      {description && <Text sx={styles.description}>{description}</Text>}
      {!!error && (
        <Text mt={2} fontSize="sm" lineHeight="5" color="red.500">
          {error.errorText}
        </Text>
      )}
    </Box>
  )
}

export { WidgetWrapper, StyledWidgetWrapper }
