import React, { ReactElement } from 'react'
import { Box } from '@chakra-ui/core'
import { makeSlots } from '@cdk/Layouts'

import type { SectionProps } from './types'

export const PageM1xA4 = makeSlots(
  {
    T1: makeSection(),
    T2: makeSection(),
    M: makeSection(),
    B1: makeSection(),
    B2: makeSection(),
  },
  (slotElements) => (
    <Box>
      <Box>{slotElements.T1}</Box>
      <Box>{slotElements.T2}</Box>
      <Box>{slotElements.M}</Box>
      <Box>{slotElements.B1}</Box>
      <Box>{slotElements.B2}</Box>
    </Box>
  )
)

function makeSection(): (props: SectionProps) => ReactElement<SectionProps> {
  return ({ children }) => <>{children}</>
}
