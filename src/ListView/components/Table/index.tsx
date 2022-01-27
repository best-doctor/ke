// Это легаси
/* eslint-disable react/jsx-props-no-spreading */
import React, { ReactNode } from 'react'
import { Flex, Text } from '@chakra-ui/react'
import { usePagination, useTable, useFilters, ActionType, TableState } from 'react-table'
import { Link } from 'react-router-dom'

import type { Row, HeaderGroup } from 'react-table'
import type { BaseAnalytic } from 'integration/analytics'
import type {
  ListFieldDescription,
  ListFilterDescription,
  ListFilterTemplateDescription,
} from 'admin/fields/FieldDescription'

import type { Pagination } from 'admin/providers/pagination'
import { StyledTable, TableCell, TableHead, TableRow } from './styles'
import { FilterBlock } from './TableFiltersBlock'
import { Bottom } from './Bottom'
import type { Provider } from '../../../admin/providers/interfaces'

type TableProps = {
  resourceName: string
  data: any
  listFilterTemplates?: ListFilterTemplateDescription[]
  listFilters?: ListFilterDescription[]
  columns: ListFieldDescription[]
  pageCount: number | undefined
  backendPagination: Pagination | undefined
  setBackendPage?: (page: number) => void
  user: any
  filterable: boolean
  analytics?: BaseAnalytic
  provider?: Provider
}

type ColumnType = {
  id: string
  getHeaderProps: () => any
  toDetailRoute?: string
  getDetailRouteKey?: (value: unknown) => string
  accessor?: (value: any) => any
  render: (name: string) => ReactNode
}

type RowType = {
  index: any
  original: any
}

type CellProps = {
  getCellProps: () => any
  row: RowType
  column: ColumnType
  render: (name: string) => ReactNode
}

// Use declaration merging to extend types https://github.com/tannerlinsley/react-table/commit/7ab63858391ebb2ff621fa71411157df19d916ba
declare module 'react-table' {
  export interface TableOptions<D extends object> extends UsePaginationOptions<D>, UseFiltersOptions<D> {}

  export interface TableInstance<D extends object = {}> extends UsePaginationInstanceProps<D> {}

  export interface TableState<D extends object = {}> extends UsePaginationState<D>, UseFiltersState<D> {}

  export interface ColumnInstance<D extends object = {}> extends UseSortByColumnProps<D> {}
}

const mountHeader = (headerGroups: HeaderGroup[]): ReactNode =>
  headerGroups.map((headerGroup: HeaderGroup) => (
    <Flex flex={1} flexDirection="row" {...headerGroup.getHeaderGroupProps()}>
      {headerGroup.headers.map((column: ColumnType) => (
        <TableCell p={4} key={column.id} bg="gray.100" {...column.getHeaderProps()} justifyContent="space-between">
          <Flex flexDirection="column">
            <Text fontWeight="bold">{column.render('Header')}</Text>
          </Flex>
        </TableCell>
      ))}
    </Flex>
  ))

const mountRows = (rows: Row[], prepareRow: Function): ReactNode =>
  rows.map((row: Row) => {
    prepareRow(row)

    return (
      // eslint-disable-next-line
      <TableRow flexDirection="row" {...row.getRowProps()} data-testid="table-row">
        {row.cells.map((cell: CellProps) => (
          <TableCell key={cell.row.index} justifyContent="flex-start" p={4} {...cell.getCellProps()}>
            {cell.column.toDetailRoute && cell.column.accessor ? (
              <Link
                to={{
                  pathname: `${cell.column.toDetailRoute}/${
                    cell.column.getDetailRouteKey
                      ? cell.column.getDetailRouteKey(cell.row.original)
                      : cell.column.accessor(cell.row.original)
                  }`,
                }}
              >
                {cell.render('Cell')}
              </Link>
            ) : (
              cell.render('Cell')
            )}
          </TableCell>
        ))}
      </TableRow>
    )
  })

const Table = ({
  resourceName,
  listFilters,
  listFilterTemplates,
  columns,
  data,
  pageCount: controlledPageCount,
  setBackendPage,
  user,
  analytics,
  filterable = false,
  provider,
}: TableProps): JSX.Element => {
  const {
    getTableProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    gotoPage,
    nextPage,
    previousPage,
    pageCount,
    state: { pageIndex },
  } = useTable(
    {
      columns,
      data,
      manualPagination: true,
      initialState: { pageIndex: 0 },
      pageCount: controlledPageCount,
      autoResetPage: false,
      stateReducer: (newState: TableState, action: ActionType) => {
        if (action.type === 'gotoPage' && setBackendPage) {
          const newPageIndex = newState.pageIndex
          setBackendPage(newPageIndex + 1)
        }
        return newState
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
        {filterable && listFilters && (
          <FilterBlock
            listFilters={listFilters}
            listFilterTemplates={listFilterTemplates}
            user={user}
            analytics={analytics}
            resourceName={resourceName}
            provider={provider}
            gotoPage={gotoPage}
          />
        )}

        <StyledTable {...getTableProps()}>
          <TableHead>{mountHeader(headerGroups)}</TableHead>
          <Flex flexDirection="column">{mountRows(page, prepareRow)}</Flex>
        </StyledTable>

        <Bottom
          analytics={analytics}
          resourceName={resourceName}
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
