import React, { Children, ReactElement, ReactNode, CSSProperties, ComponentType } from 'react'

import { Column, ColumnProps } from './Column'
import { Th, ThProps } from './Th'
import { Td, TdProps } from './Td'
import { Row, RowProps } from './Row'

export function makeTable(
  TableComponent: StyledContainer | string = 'table',
  RowComponent: StyledContainer | string = 'tr',
  HeadComponent: StyledContainer | string = 'th',
  CellComponent: StyledContainer | string = 'td'
): <T>(props: TableProps<T>) => ReactElement {
  return ({ children, data, getKey, row, columns }) => {
    const [columnConfigs, { styles: rowStyles }] = children
      ? configsFromChildren(children)
      : // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        [columns!, row || {}]

    return (
      <TableComponent>
        <thead>
          <RowComponent>
            {columnConfigs.map(({ name, header }, index) => {
              const { styles, value } = normalizeHeader(header)
              return (
                <HeadComponent style={styles} key={name || index}>
                  {typeof value === 'function' ? value(index) : value}
                </HeadComponent>
              )
            })}
          </RowComponent>
        </thead>
        <tbody>
          {data.map((item, itemIndex) => (
            <RowComponent
              key={getKey ? getKey(item) : itemIndex}
              style={typeof rowStyles === 'function' ? rowStyles(item, itemIndex) : rowStyles}
            >
              {columnConfigs.map(({ name, cell }, columnIndex) => {
                const { styles, value } = normalizeCell(cell)
                return (
                  <CellComponent
                    style={typeof styles === 'function' ? styles(item, itemIndex) : styles}
                    key={name || columnIndex}
                  >
                    {typeof value === 'function' ? value(item, itemIndex) : value}
                  </CellComponent>
                )
              })}
            </RowComponent>
          ))}
        </tbody>
      </TableComponent>
    )
  }
}

function normalizeHeader(config: HeaderConfig | ReactNode): HeaderConfig {
  return config && typeof config === 'object' && 'value' in config ? config : { value: config }
}

function normalizeCell<T>(
  config: CellConfig<T> | ReactNode | keyof T | ((item: T, index: number) => ReactNode)
): CellConfig<T> {
  const { styles = undefined, value: keyOrValue } =
    config && typeof config === 'object' && 'value' in config ? config : { value: config }

  const value =
    typeof keyOrValue === 'string'
      ? (item: T) => getter((item as unknown) as Record<string, string>, keyOrValue)
      : keyOrValue

  return {
    styles,
    value,
  }
}

function getter<T extends Record<string, string>, K extends string>(item: T, key: K): T[K] | K {
  if (item && typeof item === 'object' && key in item) {
    return item[key]
  }
  return key
}

function configsFromChildren<T>(children: ReactNode): [ColumnConfig<T>[], RowConfig<T>] {
  const columns: ColumnConfig<T>[] = Children.toArray(children)
    .filter((child) => (child as ReactElement).type === Column)
    .map((columnElement) => (columnElement as ReactElement<ColumnProps>).props)
    .map(({ name, styles, children: columnChildren }, index) => ({
      name: name || index,
      styles,
      header: headerConfigFromChildren(columnChildren),
      cell: cellConfigFromChildren(columnChildren),
    }))

  const row = rowConfigFromChildren(children)

  return [columns, row]
}

function headerConfigFromChildren(children: ReactNode): HeaderConfig {
  const headers = Children.toArray(children).filter(
    (child) => (child as ReactElement).type === Th
  ) as ReactElement<ThProps>[]

  if (headers.length > 1) {
    throw new Error(`Awaited for 1 or 0 Th elements, got ${headers.length}. Headers: ${JSON.stringify(headers)}`)
  }

  const { styles, children: value }: ThProps = headers.length ? headers[0].props : { children: null }

  return {
    styles,
    value,
  }
}

function cellConfigFromChildren<T>(children: ReactNode): CellConfig<T> {
  const cells = Children.toArray(children).filter((child) => (child as ReactElement).type === Td) as ReactElement<
    TdProps<T>
  >[]

  if (cells.length > 1) {
    throw new Error(`Awaited for 1 or 0 Td elements, got ${cells.length}. Cells: ${JSON.stringify(cells)}`)
  }

  const { styles, children: value }: TdProps<T> = cells.length ? cells[0].props : { children: null }

  return {
    styles,
    value,
  }
}

function rowConfigFromChildren<T>(children: ReactNode): RowConfig<T> {
  const rows = Children.toArray(children).filter((child) => (child as ReactElement).type === Row) as ReactElement<
    RowProps<T>
  >[]

  if (rows.length > 1) {
    throw new Error(`Awaited for 1 or 0 Row elements, got ${rows.length}. Rows: ${JSON.stringify(rows)}`)
  }

  return rows.length ? rows[0].props : {}
}

interface CommonTableProps<T> {
  data: readonly T[]
  getKey?: (item: T) => string | number
}

interface ChildrenTableProps<T> extends CommonTableProps<T> {
  columns?: never
  row?: never
  children: ReactNode
}

interface ConfigTableProps<T> extends CommonTableProps<T> {
  columns: readonly ColumnConfig<T>[]
  row?: RowConfig<T>
  children?: never
}

export type TableProps<T> = ChildrenTableProps<T> | ConfigTableProps<T>

interface ColumnConfig<T> {
  name: string | number
  styles?: CSSProperties | ((columnIndex: number) => CSSProperties)
  header: HeaderConfig | ReactNode
  cell: CellConfig<T> | ReactNode | keyof T | ((item: T, index: number) => ReactNode)
}

interface RowConfig<T> {
  styles?: CSSProperties | ((item: T, index: number) => CSSProperties)
}

interface HeaderConfig {
  styles?: CSSProperties
  value: ReactNode | ((columnIndex: number) => ReactNode)
}

interface CellConfig<T> {
  styles?: CSSProperties | ((item: T, index: number) => CSSProperties)
  value: ((item: T, index: number) => ReactNode) | keyof T | ReactNode
}

type StyledContainer = ComponentType<{
  style?: CSSProperties
  children: ReactNode
}>
