import { makeTable, withSortingInHeader } from '@cdk/tables'
import { makeWrap } from '@cdk/wrapper'
import { makePartial } from '@cdk/compatibility'
import { Box } from '@chakra-ui/react'

import { Table, THead, TBody, DataCell, DataRow, HeaderCell, HeaderRow, OrderHandler } from './components'

export const OrderedTable = makeWrap(
  makeTable(
    {
      table: Table,
      thead: THead,
      tbody: TBody,
      headerRow: HeaderRow,
      headerCell: HeaderCell,
      dataRow: DataRow,
      dataCell: DataCell,
    },
    [withSortingInHeader(OrderHandler)]
  ),
  makePartial(Box, { overflowX: 'auto' })
)
