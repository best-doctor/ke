import * as React from 'react'

import { Box, FormLabel } from '@chakra-ui/core'

const WidgetWrapper = ({
  style,
  helpText,
  children,
}: {
  style: object
  helpText: string
  children: JSX.Element
}): JSX.Element => (
  <Box {...style}>
    <FormLabel mt={5}>{helpText}</FormLabel>
    {children}
  </Box>
)

export { WidgetWrapper }
