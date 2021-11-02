import { makeWrap } from '@cdk/wrapper'
import { makeTable } from '@cdk/tables'
import { makePartial } from '@cdk/compatibility'
import { withSortingInHeader } from '@plugins/table'
import { Box } from '@chakra-ui/react'

import {
  DataCell,
  DataRow,
  HeaderCell,
  HeaderRow,
  SortHandler,
  Table as TableComponent,
  TBody,
  THead,
} from './components'

const tableComponents = {
  table: TableComponent,
  thead: THead,
  tbody: TBody,
  headerRow: HeaderRow,
  headerCell: HeaderCell,
  dataRow: DataRow,
  dataCell: DataCell,
}

const sortPlugin = withSortingInHeader(SortHandler)

const Wrapper = makePartial(Box, { overflowX: 'auto' })

export const OrderedTable = makeWrap(makeTable(tableComponents, [sortPlugin]), Wrapper)
