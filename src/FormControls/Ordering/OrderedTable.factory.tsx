import React, { ReactElement, ReactNode } from 'react'
import { HeaderConfig, TableProps } from '@cdk/Tables'
import { FormField } from '@cdk/Forms'
import { GroupControl } from '@cdk/Controls'

import { OrderDirection } from './types'
import { Order } from './Order'

export function makeOrderedTable(table: TableComponent): OrderedTableComponent {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return <T,>({ ordering, onOrderChange, columns, children, ...other }: OrderedTableProps<T>) => {
    if (!ordering) {
      return table({ ...other, columns: columns || [] })
    }
    const orderedColumns = (columns || []).map(({ header, name, ...columnOther }) => ({
      ...columnOther,
      name,
      header: ordering && name in ordering ? addOrdering(header, name) : header,
    }))

    return (
      <GroupControl value={ordering} onChange={onOrderChange}>
        {table({
          ...other,
          columns: orderedColumns,
        })}
      </GroupControl>
    )
  }
}

function addOrdering(header: HeaderConfig | ReactNode, orderingName: string | number): HeaderConfig {
  const normalizedHeader = normalizeHeader(header)
  const { value } = normalizedHeader

  const orderedValue =
    typeof value === 'function' ? (
      (columnIndex: number) => (
        <>
          {value(columnIndex)}
          <FormField name={orderingName} as={Order} />
        </>
      )
    ) : (
      <>
        {value}
        <FormField name={orderingName} as={Order} />
      </>
    )

  return {
    ...normalizedHeader,
    value: orderedValue,
  }
}

function normalizeHeader(config: HeaderConfig | ReactNode): HeaderConfig {
  return config && typeof config === 'object' && 'value' in config ? config : { value: config }
}

type TableComponent = <T>(props: TableProps<T>) => ReactElement
type OrderedTableComponent = <T>(props: OrderedTableProps<T>) => ReactElement

export type OrderedTableProps<T> = TableProps<T> & {
  ordering?: Record<string | number, OrderDirection>
  onOrderChange: (ordering: Record<string | number, OrderDirection>) => void
}
