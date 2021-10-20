import { CSSProperties, ReactNode } from 'react'

export interface ColumnConfig<T> {
  name: string | number
  styles?: CSSProperties | ((columnIndex: number) => CSSProperties)
  header: HeaderConfig | ReactNode
  cell: CellConfig<T> | ReactNode | keyof T | ((item: T, index: number) => ReactNode)
}

export interface RowConfig<T> {
  styles?: CSSProperties | ((item: T, index: number) => CSSProperties)
}

export interface HeaderConfig {
  styles?: CSSProperties
  value: ReactNode | ((columnIndex: number) => ReactNode)
}

export interface CellConfig<T> {
  styles?: CSSProperties | ((item: T, index: number) => CSSProperties)
  value: ((item: T, index: number) => ReactNode) | keyof T | ReactNode
}
