import React from 'react'
import { Box } from '@chakra-ui/react'
import { makeSlots } from '@cdk/layouts'

export const WithError = makeSlots<'Control' | 'Errors'>((slotElements) => (
  <>
    {slotElements.Control}
    {slotElements.Errors && <Box style={{ color: 'red' }}>{slotElements.Errors}</Box>}
  </>
))
