import React, { FC } from 'react'
import { LayoutProps, SectionProps, HorizontalList } from '@cdk/Layouts'
import { Table, Column, Th, Td } from '@cdk/Tables'
import { DebounceInput } from '@cdk/Controls'

import { Filters } from '../Filters'

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
      <L.Filters>
        <Filters
          filters={[
            {
              name: 'search-1',
              control: DebounceInput as any, // Temporary
            },
            {
              name: 'search-2',
              control: DebounceInput as any, // Temporary
            },
          ]}
          value={{
            'search-1': '',
            'search-2': '',
          }}
          onChange={() => {}}
          layout={HorizontalList}
        />
      </L.Filters>
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
