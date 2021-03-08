import React, { FC } from 'react'
import type { LayoutProps, SectionProps } from '@cdk/Layouts'
import { Table, Column, Th, Td } from '@cdk/Tables'

export function ItemsList({ layout: L }: ItemsListProps): JSX.Element {
  const data: Item[] = [
    {
      a: 1,
      b: 'Moscow',
    },
    {
      a: 7,
      b: 'SPb',
    },
  ]

  return (
    <L>
      <L.Filters>Filters</L.Filters>
      <L.Actions>Actions</L.Actions>
      <L.Content>
        <Table data={data} getKey={(item) => item.a}>
          <Column>
            <Th>A</Th>
            <Td>{(item: Item) => item.a}</Td>
          </Column>
          <Column>
            <Th>B</Th>
            <Td>{(item: Item) => item.b}</Td>
          </Column>
        </Table>
      </L.Content>
      <L.BatchActions>Batch actions</L.BatchActions>
      <L.Pagination>Pagination</L.Pagination>
    </L>
  )
}

interface Item {
  a: number
  b: string
}

interface ItemsListProps {
  layout: ItemsListLayout
}

type ItemsListLayout = FC<LayoutProps> & {
  Filters: FC<SectionProps>
  Actions: FC<SectionProps>
  Content: FC<SectionProps>
  BatchActions: FC<SectionProps>
  Pagination: FC<SectionProps>
}
