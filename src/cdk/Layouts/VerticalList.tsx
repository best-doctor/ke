import * as React from 'react'

export function VerticalList({ items }: ListProps): JSX.Element {
  return (
    <ul>
      {items.map((item) => (
        <li>{item}</li>
      ))}
    </ul>
  )
}

interface ListProps {
  items: ReadonlyArray<JSX.Element | string>
}
