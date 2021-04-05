import React, { CSSProperties, ReactElement } from 'react'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function Row<T>(_: RowProps<T>): ReactElement<RowProps<T>> {
  return <></>
}

export interface RowProps<T> {
  styles?: CSSProperties | ((item: T) => CSSProperties)
}
