import React, { PropsWithChildren } from 'react'

export function Th({ children }: ThProps): JSX.Element {
  return <th>{children}</th>
}

export type ThProps = PropsWithChildren<{}>
