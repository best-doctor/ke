import React from 'react'
import { Box } from '@chakra-ui/core'

import type { SectionProps } from './types'
import { makeSlots } from './Base'

export const ItemsListLayout = makeSlots(
  {
    Filters: makeSection(),
    Actions: makeSection(),
    Content: makeSection(),
    BatchActions: makeSection(),
    Pagination: makeSection(),
  },
  (slotElements) => (
    <Box>
      <Box>{slotElements.Filters}</Box>
      <Box>{slotElements.Actions}</Box>
      <Box>{slotElements.Content}</Box>
      <Box>{slotElements.BatchActions}</Box>
      <Box>{slotElements.Pagination}</Box>
    </Box>
  )
)

function makeSection(): (props: SectionProps) => JSX.Element {
  return ({ children }: SectionProps): JSX.Element => {
    return <>{children}</>
  }
}
