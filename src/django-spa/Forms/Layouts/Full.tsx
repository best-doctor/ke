import { makeSlots } from '@cdk/Layouts'
import React, { PropsWithChildren } from 'react'

export const Full = makeSlots(
  {
    Label: ({ children }: PropsWithChildren<{}>) => <>{children}</>,
    Control: ({ children }: PropsWithChildren<{}>) => <>{children}</>,
  },
  (slotElements) => <>{slotElements.Control}</>
)
