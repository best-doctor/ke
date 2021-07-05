import React, { PropsWithChildren } from 'react'
import { makeSlots } from '@cdk/Layouts'

export const EmptyFilter = makeSlots(
  {
    main: ({ children }: PropsWithChildren<{}>) => <>{children}</>,
    buttons: ({ children }: PropsWithChildren<{}>) => <>{children}</>,
    additional: ({ children }: PropsWithChildren<{}>) => <>{children}</>,
  },
  () => <></>
)
