import React, { ReactElement, ReactNode } from 'react'
import { Box, Flex } from '@chakra-ui/core'

export function HorizontalList({ items }: HorizontalListProps): ReactElement {
  return (
    <Flex>
      {items.map(([key, element]) => (
        <Box key={key}>{element}</Box>
      ))}
    </Flex>
  )
}

interface HorizontalListProps {
  items: [string, ReactNode][]
}
