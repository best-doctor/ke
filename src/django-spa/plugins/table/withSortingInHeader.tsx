import React, { ComponentType, PropsWithChildren, ReactNode } from 'react'
import { TablePlugin } from '@cdk/tables'

export function withSortingInHeader(OrderHandler: ComponentType<SortHandlerProps>): TablePlugin<SortingProps> {
  return {
    after: (normalizedProps) => {
      const { orderedColumnNames, ordering, onOrderChange, ...restTableProps } = normalizedProps.table
      const result = {
        ...normalizedProps,
        table: restTableProps,
      }

      if (!orderedColumnNames.length) {
        return result
      }

      const { cells: headers } = normalizedProps.thead
      const headersWithSorting: typeof headers = headers.map(([name, header]) => [
        name,
        orderedColumnNames.includes(name)
          ? addHandler(header, OrderHandler, (ordering && ordering[name]) || null, (newDirection) => {
              onOrderChange({
                ...ordering,
                [name]: newDirection,
              })
            })
          : header,
      ])

      return {
        ...result,
        thead: {
          ...result.thead,
          cells: headersWithSorting,
        },
      }
    },
  }
}

function addHandler<P extends PropsWithChildren<{}>>(
  headerProps: P,
  OrderHandler: ComponentType<SortHandlerProps>,
  orderDirection: Direction,
  onOrderChange: (newDirection: Direction) => void
): P {
  const { children, ...restHeaderProps } = headerProps
  return {
    ...restHeaderProps,
    children: <OrderHandler headerValue={children} orderDirection={orderDirection} onChange={onOrderChange} />,
  } as P
}

export interface SortingProps {
  orderedColumnNames: (string | number)[]
  ordering?: Record<string | number, Direction>
  onOrderChange: (ordering: Record<string | number, Direction>) => void
}

interface SortHandlerProps {
  orderDirection: Direction
  onChange: (newDirection: Direction) => void
  headerValue: ReactNode
}

type Direction = 'asc' | 'desc' | null
