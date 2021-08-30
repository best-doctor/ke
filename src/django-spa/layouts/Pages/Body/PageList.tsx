import React, { ReactNode } from 'react'
import { Box } from '@chakra-ui/react'
import { makeSlots } from '@cdk/Layouts'

/**
 * Макет основного содержимого для страниц-списков с поддержкой фильтрации и пагинации
 */
export const PageList = makeSlots(
  {
    Filters: ({ children }: { children: ReactNode }) => <>{children}</>,
    Data: ({ children }: { children: ReactNode }) => <>{children}</>,
    Pagination: ({ children }: { children: ReactNode }) => <>{children}</>,
  },
  (slotElements) => (
    <Box>
      <Box>{slotElements.Filters}</Box>
      <Box>{slotElements.Data}</Box>
      <Box>{slotElements.Pagination}</Box>
    </Box>
  )
)
