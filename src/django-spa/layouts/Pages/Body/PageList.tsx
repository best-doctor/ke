import React from 'react'
import { Box } from '@chakra-ui/react'
import { makeSlots } from '@cdk/layouts'

/**
 * Макет основного содержимого для страниц-списков с поддержкой фильтрации и пагинации
 */
export const PageList = makeSlots<'filters' | 'data' | 'pagination'>((slotElements) => (
  <Box>
    <Box>{slotElements.filters}</Box>
    <Box>{slotElements.data}</Box>
    <Box>{slotElements.pagination}</Box>
  </Box>
))
