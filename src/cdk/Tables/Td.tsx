import React, { CSSProperties, ReactNode } from 'react'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function Td<T>(_: TdProps<T>): JSX.Element {
  return <></>
}

export interface TdProps<T> {
  item?: T
  styles?: CSSProperties | ((item: T) => CSSProperties)
  children: ReactNode | ((item: T, index: number) => ReactNode)
}
