import React, { ReactElement, ReactNode, useMemo } from 'react'
import { Box, Center, Flex, Spacer } from '@chakra-ui/react'
import { HeaderConfig, TableProps } from '@cdk/TablesOld'
import { Field } from '@components/integrators/Forms'
import { GroupControl } from '@cdk/Controls'

import { OrderDirection } from './types'
import { Order } from './Order'

export function makeOrderedTable(table: TableComponent): OrderedTableComponent {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return <T,>({ ordering, orderedColumnNames, onOrderChange, columns, children, ...other }: OrderedTableProps<T>) => {
    if (!orderedColumnNames) {
      return table({ ...other, columns: columns || [] })
    }
    const orderedColumns = (columns || []).map(({ header, name, ...columnOther }) => ({
      ...columnOther,
      name,
      header: orderedColumnNames.includes(name) ? addOrdering(header, name) : header,
    }))
    const fullOrdering = useMemo(
      () => ({
        ...Object.fromEntries(orderedColumnNames.map((name) => [name, null])),
        ...ordering,
      }),
      [ordering, orderedColumnNames]
    )
    return (
      <GroupControl
        value={fullOrdering}
        onChange={onOrderChange as (ordering: Record<string | number, unknown>) => void}
      >
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
        <Flex>
          <Box p="2">{value(columnIndex)}</Box>
          <Spacer />
          <Center>
            <Field name={orderingName} as={Order} />
          </Center>
        </Flex>
      )
    ) : (
      <Flex>
        <Box pr="2">{value}</Box>
        <Spacer />
        <Center>
          <Field name={orderingName} as={Order} />
        </Center>
      </Flex>
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
  orderedColumnNames: (string | number)[]
  ordering?: Record<string | number, OrderDirection>
  onOrderChange: (ordering: Record<string | number, OrderDirection>) => void
}
