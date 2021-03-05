import React, { PropsWithChildren, Children, ReactElement } from 'react'

import { Column } from './Column'
import { Th } from './Th'
import { Td } from './Td'

export function Table<T>({ children, data, getKey }: TableProps<T>): JSX.Element {
  const columns = Children.toArray(children)
    .filter((child) => (child as ReactElement).type === Column)
    .map((columnElement, index) => ({
      key: index,
      headCell: Children.toArray((columnElement as ReactElement).props.children).find(
        (child) => (child as ReactElement).type === Th
      ) as ReactElement,
      dataCell: Children.toArray((columnElement as ReactElement).props.children).find(
        (child) => (child as ReactElement).type === Td
      ) as ReactElement,
    }))

  return (
    <table>
      <thead>
        <tr>
          {columns.map(({ key, headCell }) => (
            <headCell.type {...headCell.props} key={key} />
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={getKey(item)}>
            {columns.map(({ key, dataCell }) => (
              <dataCell.type {...dataCell.props} key={key} item={item} />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

type TableProps<T> = PropsWithChildren<{
  data: readonly T[]
  getKey: (item: T) => string | number
}>
