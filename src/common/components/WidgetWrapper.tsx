import * as React from 'react'

import { Box, FormLabel } from '@chakra-ui/core'
import { FaCopy } from 'react-icons/all'

const WidgetWrapper = ({
  style,
  helpText,
  children,
  copyValue,
  useClipboard,
}: {
  style: object
  helpText?: string
  children: JSX.Element[] | JSX.Element
  copyValue?: Function
  useClipboard?: boolean
}): JSX.Element => {
  const handleClipboard = (): void => {
    if (copyValue) navigator.clipboard.writeText(copyValue())
  }

  return (
    <Box {...style}>
      <FormLabel mt={5}>
        {helpText || ''}
        {useClipboard && (
          <Box as={FaCopy} size="1em" ml={5} display="inline" color="blue.500" onClick={handleClipboard} />
        )}
      </FormLabel>
      {children}
    </Box>
  )
}

export { WidgetWrapper }
