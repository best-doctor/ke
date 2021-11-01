import React, { ComponentType, PropsWithChildren, ReactNode } from 'react'

import { TablePlugin } from './types'

export function withSortingInHeader(OrderHandler: ComponentType<OrderHandlerProps>): TablePlugin<SortingProps> {
  return {
    after: (normalizedProps) => {
      const { orderedColumnNames, ordering, onOrderChange, ...restTableProps } = normalizedProps.table
      const result = {
        ...normalizedProps,
        table: restTableProps,
      }

      if (orderedColumnNames.length) {
        return result
      }

      const { cells: headers } = normalizedProps.thead
      const headersWithSorting: typeof headers = headers.map(([name, header]) => [
        name,
        orderedColumnNames.includes(name)
          ? addHandler(header, OrderHandler, (ordering && ordering[name]) || null, (newDirection) => {
              onOrderChange({
                ...ordering,
                name: newDirection,
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
  OrderHandler: ComponentType<OrderHandlerProps>,
  orderDirection: OrderDirection,
  onOrderChange: (newDirection: OrderDirection) => void
): P {
  const { children, ...restHeaderProps } = headerProps

  return {
    ...restHeaderProps,
    children: <OrderHandler headerValue={children} orderDirection={orderDirection} onChange={onOrderChange} />,
  } as P
}

export interface SortingProps {
  orderedColumnNames: (string | number)[]
  ordering?: Record<string | number, OrderDirection>
  onOrderChange: (ordering: Record<string | number, OrderDirection>) => void
}

interface OrderHandlerProps {
  orderDirection: OrderDirection
  onChange: (newDirection: OrderDirection) => void
  headerValue: ReactNode
}

type OrderDirection = 'asc' | 'desc' | null
