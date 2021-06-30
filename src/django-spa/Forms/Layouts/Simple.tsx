import { makeSlots } from '@cdk/Layouts'
import React, { PropsWithChildren } from 'react'

export const Simple = makeSlots(
  {
    Label: ({ children }: PropsWithChildren<{}>) => <>{children}</>,
    Control: ({ children }: PropsWithChildren<{}>) => <>{children}</>,
    Errors: ({ children }: PropsWithChildren<{}>) => <>{children}</>,
  },
  (slotElements) => <>{slotElements.Control}</>
)
