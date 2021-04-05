import React, { CSSProperties, PropsWithChildren, ReactElement } from 'react'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function Column(_: ColumnProps): ReactElement<ColumnProps> {
  return <></>
}

export type ColumnProps = PropsWithChildren<{
  name?: string | number
  styles?: CSSProperties
}>
