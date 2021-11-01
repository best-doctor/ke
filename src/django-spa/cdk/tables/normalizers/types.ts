import { PropsWithChildren, ReactChild } from 'react'

export type DataRowDesc<RProps, T, Extra> = RowConfig<RProps> | DataRowConfigGenerator<RProps, T, Extra>

export type DataRowConfigGenerator<RProps, T, Extra> = (item: T, rowIndex: number, extra: Extra) => RowConfig<RProps>

export type HeaderRowDesc<RProps, Extra> = RowConfig<RProps> | HeaderRowConfigGenerator<RProps, Extra>

export type HeaderRowConfigGenerator<RProps, Extra> = (extra: Extra) => RowConfig<RProps>

export type RowConfig<RProps> = Omit<RProps, 'children'>

export type RowProps<RProps> = Omit<RProps, 'children'>

export type HeaderDesc<HProps, Extra> =
  | HeaderConfig<HProps>
  | HeaderConfigGenerator<HProps, Extra>
  | StrictReactNode
  | HeaderNodeGenerator<Extra>

export type HeaderConfig<HProps> = Omit<HProps, 'children' | 'value'> & {
  value: StrictReactNode
}

export type HeaderConfigGenerator<HProps, Extra> = (columnIndex: number, extra: Extra) => HeaderConfig<HProps>

export type HeaderNodeGenerator<Extra> = (columnIndex: number, extra: Extra) => StrictReactNode

export type HeaderProps<HProps> = PropsWithChildren<HProps>

export type CellDesc<CProps, T, Extra> =
  | CellConfig<CProps, T>
  | CellConfigGenerator<CProps, T, Extra>
  | StrictReactNode
  | keyof T
  | CellNodeGenerator<T, Extra>

export type CellConfig<CProps, T> = {
  value: keyof T | StrictReactNode
} & Omit<CProps, 'children'>

export type CellConfigGenerator<CProps, T, Extra> = (
  item: T,
  rowIndex: number,
  columnIndex: number,
  extra: Extra
) => CellConfig<CProps, T>

export type CellNodeGenerator<T, Extra> = (
  item: T,
  rowIndex: number,
  columnIndex: number,
  extra: Extra
) => StrictReactNode

export type CellProps<CProps> = PropsWithChildren<CProps>

export type StrictReactNode = ReactChild | undefined | null | boolean
