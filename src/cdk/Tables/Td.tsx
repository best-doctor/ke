import React, { ReactNode } from 'react'

export function Td<T>({ children, item }: TdProps<T>): JSX.Element {
  return <td>{item !== undefined ? children(item) : null}</td>
}

interface TdProps<T> {
  item?: T
  children: (item: T) => ReactNode
}
