import * as React from 'react'
import styled from 'styled-components'
import { useTable } from 'react-table'

import type { Row, Cell, Column, HeaderGroup } from 'react-table'
import type { ReactNode } from 'react'

const Styles = styled.div`
  /* This is required to make the table full-width */
  display: block;
  max-width: 100%;

  /* This will make the table scrollable when it gets too small */
  .tableWrap {
    display: block;
    max-width: 100%;
    overflow-x: scroll;
    overflow-y: hidden;
    border-bottom: 1px solid black;
  }

  table {
    /* Make sure the inner table is always as wide as needed */
    width: 100%;
    border-spacing: 0;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      /* The secret sauce */
      /* Each cell should grow equally */
      width: 1%;
      /* But "collapsed" cells should be as small as possible */
      &.collapse {
        width: 0.0000000001%;
      }

      :last-child {
        border-right: 0;
      }
    }
  }

  .pagination {
    padding: 0.5rem;
  }
`

const mountHeaders = (headerGroups: Array<HeaderGroup>): ReactNode => {
  return headerGroups.map((headerGroup: HeaderGroup) => (
    <tr {...headerGroup.getHeaderGroupProps()}>
      {headerGroup.headers.map((column: any) => (
        <th {...column.getHeaderProps()}>{column.render('Header')}</th>
      ))}
    </tr>
  ))
}

const mountBody = (prepareRow: Function, rows: Array<Row>): ReactNode => {
  return rows.map((row) => {
    prepareRow(row)

    return (
      <tr {...row.getRowProps()}>
        {row.cells.map((cell: Cell) => {
          return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
        })}
      </tr>
    )
  })
}

const TableConstructor = (props: any): JSX.Element => {
  const { columns, data } = props
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  })

  return (
    <table {...getTableProps()}>
      <thead>{mountHeaders(headerGroups)}</thead>
      <tbody {...getTableBodyProps()}>{mountBody(prepareRow, rows)}</tbody>
    </table>
  )
}

const Table = (props: any): JSX.Element => {
  const { data, columns }: { data: Array<any>; columns: Array<Column> } = props

  return (
    <Styles>
      <TableConstructor columns={columns} data={data} />
    </Styles>
  )
}

export { Table }
