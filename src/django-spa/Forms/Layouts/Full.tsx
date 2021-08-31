import React from 'react'
import { makeSlots } from '@cdk/Layouts'
import { Box } from '@chakra-ui/react'

export const Full = makeSlots<'Label' | 'Control' | 'Errors'>((slotElements) => (
  <>
    {slotElements.Label}
    {slotElements.Control}
    {slotElements.Errors && <Box style={{ color: 'red' }}>{slotElements.Errors}</Box>}
  </>
))
