import { makeSlots } from '@cdk/Layouts'
import React, { PropsWithChildren } from 'react'

export const Simple = makeSlots(
  {
    Control: ({ children }: PropsWithChildren<{}>) => <>{children}</>,
  },
  (slotElements) => <>{slotElements.Control}</>
)
