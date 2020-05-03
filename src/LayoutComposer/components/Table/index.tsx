import * as React from 'react'
import { Flex, Text } from '@chakra-ui/core'
import { usePagination, useSortBy, useTable } from 'react-table'

import type { ReactNode } from 'react'
import type { Row, HeaderGroup, Column } from 'react-table'
import { StyledTable, TableCell, TableHead, TableRow } from './styles'

type TableProps = {
  data: any
  columns: Column[]
}

const mountHeader = (headerGroups: HeaderGroup[]): ReactNode => {
  return headerGroups.map((headerGroup: HeaderGroup) => (
    <Flex key={headerGroup.id} flex={1} flexDirection="row" {...headerGroup.getHeaderGroupProps()}>
      {headerGroup.headers.map((column: any) => (
        <TableCell
          p={4}
          key={column.id}
          bg="gray.100"
          {...column.getHeaderProps()}
          justifyContent="space-between"
          {...column.getSortByToggleProps()}
        >
          <Text fontWeight="bold">{column.render('Header')}</Text>
        </TableCell>
      ))}
    </Flex>
  ))
}

const mountRows = (rows: Row[], prepareRow: Function): ReactNode => {
  return rows.map((row: Row, key: number) => {
    prepareRow(row)

    return (
      // eslint-disable-next-line
      <TableRow key={key} flexDirection="row" {...row.getRowProps()} data-testid="table-row">
        {row.cells.map((cell: any) => {
          return (
            <TableCell key={cell.row.index} justifyContent="flex-start" p={4} {...cell.getCellProps()}>
              {cell.render('Cell')}
            </TableCell>
          )
        })}
      </TableRow>
    )
  })
}

const Table = ({ columns, data }: TableProps): JSX.Element => {
  const { getTableProps, headerGroups, prepareRow, rows } = useTable(
    {
      columns,
      data,
    },
    useSortBy,
    usePagination
  )

  return (
    <Flex flexDirection="row" width="100%" flex={1} bg="gray.50" p={4}>
      <Flex
        flexDirection="column"
        flex={1}
        maxWidth="100%"
        bg="white"
        width="auto"
        rounded="md"
        borderWidth="1px"
        onClick={() => false}
      >
        <StyledTable {...getTableProps()}>
          <TableHead>{mountHeader(headerGroups)}</TableHead>
          <Flex flexDirection="column">{mountRows(rows, prepareRow)}</Flex>
        </StyledTable>
      </Flex>
    </Flex>
  )
}

export { Table }
