import * as React from 'react'

import { Box, FormLabel } from '@chakra-ui/core'

const WidgetWrapper = ({
  style,
  helpText,
  children,
}: {
  style: object
  helpText: string
  children: JSX.Element[] | JSX.Element
}): JSX.Element => {
  return (
    <Box {...style}>
      <FormLabel mt={5}>{helpText}</FormLabel>
      {children}
    </Box>
  )
}

export { WidgetWrapper }
