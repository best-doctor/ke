import * as React from 'react'
import { Flex, Text } from '@chakra-ui/core'
import { usePagination, useTable, useFilters } from 'react-table'

import type { ReactNode } from 'react'
import type { Row, HeaderGroup } from 'react-table'
import type { ListFieldDescription } from 'admin/fields/FieldDescription'

import { StyledTable, TableCell, TableHead, TableRow } from './styles'
import { Bottom } from './Bottom'

type TableProps = {
  data: any
  columns: ListFieldDescription[]
  setBackendFilters: Function | undefined
}

// Use declaration merging to extend types https://github.com/tannerlinsley/react-table/commit/7ab63858391ebb2ff621fa71411157df19d916ba
declare module 'react-table' {
  export interface TableOptions<D extends object> extends UsePaginationOptions<D>, UseFiltersOptions<D> {}

  export interface TableInstance<D extends object = {}> extends UsePaginationInstanceProps<D> {}

  export interface TableState<D extends object = {}> extends UsePaginationState<D>, UseFiltersState<D> {}

  export interface ColumnInstance<D extends object = {}> extends UseSortByColumnProps<D> {}
}

const mountHeader = (headerGroups: HeaderGroup[]): ReactNode => {
  return headerGroups.map((headerGroup: HeaderGroup) => (
    <Flex flex={1} flexDirection="row" {...headerGroup.getHeaderGroupProps()}>
      {headerGroup.headers.map((column: any) => (
        <TableCell p={4} key={column.id} bg="gray.100" {...column.getHeaderProps()} justifyContent="space-between">
          <Text fontWeight="bold">{column.render('Header')}</Text>
          {column.Filter ? column.render('Filter') : null}
        </TableCell>
      ))}
    </Flex>
  ))
}

const mountRows = (rows: Row[], prepareRow: Function): ReactNode => {
  return rows.map((row: Row) => {
    prepareRow(row)

    return (
      // eslint-disable-next-line
      <TableRow flexDirection="row" {...row.getRowProps()} data-testid="table-row">
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

const Table = ({ columns, data, setBackendFilters }: TableProps): JSX.Element => {
  const {
    getTableProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    state: { pageIndex },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
      stateReducer: (newState: any, action: any, _) => {
        if (action.type === 'setFilter' && setBackendFilters) {
          setBackendFilters(newState.filters)
          return newState
        }
      },
    },
    useFilters,
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
          <Flex flexDirection="column">{mountRows(page, prepareRow)}</Flex>
        </StyledTable>

        <Bottom
          pageIndex={pageIndex}
          canPreviousPage={canPreviousPage}
          canNextPage={canNextPage}
          pageOptions={pageOptions}
          pageCount={pageCount}
          gotoPage={gotoPage}
          nextPage={nextPage}
          previousPage={previousPage}
        />
      </Flex>
    </Flex>
  )
}

export { Table }
