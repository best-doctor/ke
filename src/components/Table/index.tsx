import * as React from 'react'
import { Flex, Text, Box, Collapse, Button } from '@chakra-ui/core'
import { usePagination, useTable, useFilters } from 'react-table'
import { useHistory } from 'react-router-dom'

import type { ReactNode } from 'react'
import type { Row, HeaderGroup } from 'react-table'
import type {
  ListFieldDescription,
  ListFilterDescription,
  ListFilterTemplateDescription,
} from 'admin/fields/FieldDescription'

import { StyledTable, TableCell, TableHead, TableRow } from './styles'
import { Bottom } from './Bottom'
import type { Pagination } from '../../admin/providers'
import { FilterManager } from '../../utils/filterManager'

type TableProps = {
  data: any
  detailsRoute?: Function
  listFilterTemplates?: ListFilterTemplateDescription[]
  listFilters?: ListFilterDescription[]
  columns: ListFieldDescription[]
  pageCount: number | undefined
  backendPagination: Pagination | undefined
  setBackendPage: Function | undefined
  user: any
  filterable: boolean
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
          <Flex flexDirection="column">
            <Text fontWeight="bold">{column.render('Header')}</Text>
          </Flex>
        </TableCell>
      ))}
    </Flex>
  ))
}

const mountRows = (
  rows: Row[],
  prepareRow: Function,
  detailsRoute: Function | undefined,
  push: Function
): ReactNode => {
  const goToResource = (route: string): (() => void) => {
    return () => push(route)
  }
  return rows.map((row: Row) => {
    prepareRow(row)

    return (
      // eslint-disable-next-line
      <TableRow flexDirection="row" {...row.getRowProps()} data-testid="table-row">
        {row.cells.map((cell: any) => {
          let onclickhandler: {
            onClick?: Function
          }

          if (cell.column.toDetailRoute) {
            onclickhandler = {
              onClick: goToResource(cell.column.toDetailRoute(cell.row.original)),
            }
          } else if (detailsRoute) {
            onclickhandler = {
              onClick: goToResource(`./${detailsRoute(cell.row.original)}`),
            }
          } else {
            onclickhandler = {
              // Routing to id by default
              onClick: goToResource(`./${cell.row.original.id}`),
            }
          }

          return (
            <TableCell
              key={cell.row.index}
              justifyContent="flex-start"
              p={4}
              {...cell.getCellProps()}
              {...onclickhandler}
            >
              {cell.render('Cell')}
            </TableCell>
          )
        })}
      </TableRow>
    )
  })
}

const FilterBlock = ({
  listFilters,
  listFilterTemplates,
  user,
}: {
  listFilters?: ListFilterDescription[]
  listFilterTemplates?: ListFilterTemplateDescription[]
  user: any
}): JSX.Element => {
  const history = useHistory()

  const [show, setShow] = React.useState<boolean>(false)
  const handleToggle = (): void => setShow(!show)

  const mountFilters = (): ReactNode => {
    // eslint-disable-next-line
    return (
      <Flex flexWrap="wrap" key="custom_filters">
        {listFilters &&
          listFilters.map((listFilter: ListFilterDescription) => (
            <Flex flexDirection="column" m={2} key={listFilter.name}>
              <Text fontWeight="bold">{listFilter.label}</Text>
              <Box>{React.createElement(listFilter.Filter, listFilter)}</Box>
            </Flex>
          ))}
      </Flex>
    )
  }

  return (
    <>
      <Flex flexDirection="row">
        <Button variantColor="teal" onClick={handleToggle} maxWidth={130} m={2}>
          Фильтровать
        </Button>
        <Button variantColor="teal" onClick={() => FilterManager.resetFilters(history)} maxWidth={130} m={2}>
          Сбросить
        </Button>
      </Flex>
      {listFilterTemplates && (
        <Flex flexDirection="row">
          {listFilterTemplates.map((listFilterTemplate: ListFilterTemplateDescription) => (
            <Button
              variantColor="teal"
              variant="outline"
              onClick={() => FilterManager.overrideFilters(listFilterTemplate.filters(user), history)}
              maxWidth={150}
              m={2}
              key={listFilterTemplate.name}
            >
              {listFilterTemplate.label}
            </Button>
          ))}
        </Flex>
      )}
      <Collapse mt={19} isOpen={show}>
        {mountFilters()}
      </Collapse>
    </>
  )
}

const Table = ({
  listFilters,
  listFilterTemplates,
  columns,
  data,
  pageCount: controlledPageCount,
  setBackendPage,
  user,
  filterable = false,
  detailsRoute = undefined,
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
      stateReducer: (newState: any, action: any) => {
        if (action.type === 'gotoPage' && setBackendPage) {
          setBackendPage(newState.pageIndex + 1)
        }
        return newState
      },
    },
    useFilters,
    usePagination
  )

  const { push } = useHistory()

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
          <FilterBlock listFilters={listFilters} listFilterTemplates={listFilterTemplates} user={user} />
        )}

        <StyledTable {...getTableProps()}>
          <TableHead>{mountHeader(headerGroups)}</TableHead>
          <Flex flexDirection="column">{mountRows(page, prepareRow, detailsRoute, push)}</Flex>
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
