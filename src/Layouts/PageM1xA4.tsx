import React from 'react'
import { Box } from '@chakra-ui/react'
import { makeSlots } from '@cdk/layouts'

export const PageM1xA4 = makeSlots<'T1' | 'T2' | 'M' | 'B1' | 'B2'>((slotElements) => (
  <Box>
    <Box>{slotElements.T1}</Box>
    <Box>{slotElements.T2}</Box>
    <Box>{slotElements.M}</Box>
    <Box>{slotElements.B1}</Box>
    <Box>{slotElements.B2}</Box>
  </Box>
))
