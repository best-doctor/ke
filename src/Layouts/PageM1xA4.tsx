import React, { ReactNode } from 'react'
import { Box } from '@chakra-ui/react'
import { makeSlots } from '@cdk/Layouts'

export const PageM1xA4 = makeSlots(
  {
    T1: ({ children }: { children: ReactNode }) => <>{children}</>,
    T2: ({ children }: { children: ReactNode }) => <>{children}</>,
    M: ({ children }: { children: ReactNode }) => <>{children}</>,
    B1: ({ children }: { children: ReactNode }) => <>{children}</>,
    B2: ({ children }: { children: ReactNode }) => <>{children}</>,
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
