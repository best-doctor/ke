import React, { ReactElement, useCallback, useState } from 'react'
import { TableProps, ColumnConfig } from '@cdk/TablesOld'

import { ColumnsHider } from './ColumnsHider'

const SEPARATOR = ','

const getInitialVisibleColumns = <T,>(
  visibleColumnsPersistName: string,
  columns: readonly ColumnConfig<T>[]
): readonly ColumnConfig<T>[] => {
  const columnsNames = localStorage.getItem(visibleColumnsPersistName)?.split(SEPARATOR)

  return columnsNames ? columns.filter(({ name }) => columnsNames.includes(String(name))) : columns
}

export function makeTableWithHidableColumns(table: TableComponent): TableWithHidableColumnsComponent {
  return <T,>({ visibleColumnsPersistName, columns, ...rest }: TableWithHidableColumnsProps<T>) => {
    const [visibleColumns, setVisibleColumns] = useState<readonly ColumnConfig<T>[]>(
      getInitialVisibleColumns(visibleColumnsPersistName, columns)
    )

    const handleChange = useCallback(
      (newVisibleColumns: readonly ColumnConfig<T>[]) => {
        localStorage.setItem(visibleColumnsPersistName, newVisibleColumns.map(({ name }) => name).join(SEPARATOR))
        setVisibleColumns(newVisibleColumns)
      },
      [setVisibleColumns, visibleColumnsPersistName]
    )
    return (
      <ColumnsHider<T> columns={columns} visibleColumns={visibleColumns} onChange={handleChange}>
        {table({
          columns: visibleColumns,
          ...rest,
        })}
      </ColumnsHider>
    )
  }
}

type TableComponent = <T>(props: TableProps<T>) => ReactElement
type TableWithHidableColumnsComponent = <T>(props: TableWithHidableColumnsProps<T>) => ReactElement

export type TableWithHidableColumnsProps<T> = TableProps<T> & { visibleColumnsPersistName: string }
