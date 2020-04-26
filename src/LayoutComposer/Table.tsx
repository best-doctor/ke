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
    border-spacing: 0;
    border: 1px solid #ededed;
  }
  table tr:last-child td {
    border-bottom: 0;
  }
  table th,
  table td {
    margin: 0;
    padding: 0.5rem;
    border-bottom: 1px solid #ededed;
    border-right: 1px solid #ededed;
    position: relative;
  }
  table th:last-child,
  table td:last-child {
    border-right: 0;
  }
  table tr:nth-child(even) {
    background-color: #fafafa;
  }

  table th::before {
    position: absolute;
    right: 15px;
    top: 16px;
    content: '';
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
  }
  table th.sort-asc::before {
    border-bottom: 5px solid #22543d;
  }
  table th.sort-desc::before {
    border-top: 5px solid #22543d;
  }

  .TableConstructor {
    display: flex;
    flex-direction: column;
    padding: 20px;
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
      <TableConstructor className="TableConstructor" columns={columns} data={data} />
    </Styles>
  )
}

export { Table }
