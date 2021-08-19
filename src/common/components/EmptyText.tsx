import { styled, Text } from '@chakra-ui/react'

export const EmptyText = styled(Text, {
  baseStyle: {
    _empty: {
      '&::before': {
        content: '"-"',
      },
    },
  },
})
