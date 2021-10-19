import React from 'react'
import { makeSlots } from '@cdk/Layouts'
import { Box } from '@chakra-ui/react'

export const WithError = makeSlots<'Control' | 'Errors'>((slotElements) => (
  <>
    {slotElements.Control}
    {slotElements.Errors && <Box style={{ color: 'red' }}>{slotElements.Errors}</Box>}
  </>
))
