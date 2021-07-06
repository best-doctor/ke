import { makeSlots } from '@cdk/Layouts'
import React, { PropsWithChildren } from 'react'
import { Box } from '@chakra-ui/react'

export const WithError = makeSlots(
  {
    Label: ({ children }: PropsWithChildren<{}>) => <>{children}</>,
    Control: ({ children }: PropsWithChildren<{}>) => <>{children}</>,
    Errors: ({ children }: PropsWithChildren<{}>) =>
      children ? <Box style={{ color: 'red' }}>{children}</Box> : <></>,
  },
  (slotElements) => (
    <>
      {slotElements.Control}
      {slotElements.Errors}
    </>
  )
)
