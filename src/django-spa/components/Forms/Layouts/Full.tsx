import React from 'react'
import { Box } from '@chakra-ui/react'
import { makeSlots } from '@cdk/layouts'

export const Full = makeSlots<'Label' | 'Control' | 'Errors'>((slotElements) => (
  <>
    {slotElements.Label}
    {slotElements.Control}
    {slotElements.Errors && <Box style={{ color: 'red' }}>{slotElements.Errors}</Box>}
  </>
))
