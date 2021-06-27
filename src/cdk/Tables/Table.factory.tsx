import React, { ReactElement, ReactNode, CSSProperties, ComponentType } from 'react'

export function makeTable(
  TableComponent: StyledContainer | string = 'table',
  RowComponent: StyledContainer | string = 'tr',
  HeadComponent: StyledContainer | string = 'th',
  CellComponent: StyledContainer | string = 'td'
): <T>(props: TableProps<T>) => ReactElement {
  return ({ data, getKey, row, columns }) => {
    const [columnConfigs, { styles: rowStyles }] = [columns, row || {}]

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

export interface TableProps<T> {
  data: readonly T[]
  getKey?: (item: T) => string | number
  columns: readonly ColumnConfig<T>[]
  row?: RowConfig<T>
  children?: never
}

interface ColumnConfig<T> {
  name: string | number
  styles?: CSSProperties | ((columnIndex: number) => CSSProperties)
  header: HeaderConfig | ReactNode
  cell: CellConfig<T> | ReactNode | keyof T | ((item: T, index: number) => ReactNode)
}

interface RowConfig<T> {
  styles?: CSSProperties | ((item: T, index: number) => CSSProperties)
}

export interface HeaderConfig {
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
