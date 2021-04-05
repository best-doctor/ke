import React, { CSSProperties, ReactElement, ReactNode } from 'react'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function Th(_: ThProps): ReactElement<ThProps> {
  return <></>
}

export interface ThProps {
  styles?: CSSProperties
  children: ReactNode | ((columnIndex: number) => ReactNode)
}
