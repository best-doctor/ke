import React, { ReactElement, ReactNode } from 'react'
import { Box } from '@chakra-ui/core'

export function VerticalList({ items }: VerticalListProps): ReactElement {
  return (
    <>
      {items.map(([key, element]) => (
        <Box key={key}>{element}</Box>
      ))}
    </>
  )
}

interface VerticalListProps {
  items: [string, ReactNode][]
}
