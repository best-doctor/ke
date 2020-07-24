import * as React from 'react'

import { Avatar, Box, FormLabel } from '@chakra-ui/core'

type AvatarWidgetProps = {
  name: string
  helpText: string
  style: any
}

const AvatarWidget = ({ helpText, style }: AvatarWidgetProps): JSX.Element => {
  return (
    <Box {...style}>
      <FormLabel mt={5}>{helpText}</FormLabel>
      <Avatar name="BD" src="" />
    </Box>
  )
}

export { AvatarWidget }
