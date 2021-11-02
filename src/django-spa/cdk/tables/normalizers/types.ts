import { PropsWithChildren, ReactChild } from 'react'

export type DataRowDesc<RProps, T, Extra> = RowConfig<RProps> | DataRowConfigGenerator<RProps, T, Extra>

export type DataRowConfigGenerator<RProps, T, Extra> = (item: T, rowIndex: number, extra: Extra) => RowConfig<RProps>

export type HeaderRowDesc<RProps, Extra> = RowConfig<RProps> | HeaderRowConfigGenerator<RProps, Extra>

export type HeaderRowConfigGenerator<RProps, Extra> = (extra: Extra) => RowConfig<RProps>

export type RowConfig<RProps> = Omit<RProps, 'children'>

export type RowProps<RProps> = Omit<RProps, 'children'>

export type HeaderDesc<HProps, Extra> =
  | HeaderConfig<HProps, Extra>
  | HeaderConfigGenerator<HProps, Extra>
  | StrictReactNode
  | HeaderNodeGenerator<Extra>

export type HeaderConfig<HProps, Extra> = Omit<HProps, 'children' | 'value'> & {
  value: StrictReactNode | HeaderNodeGenerator<Extra>
}

export type HeaderConfigGenerator<HProps, Extra> = (columnIndex: number, extra: Extra) => HeaderConfig<HProps, Extra>

export type HeaderNodeGenerator<Extra> = (columnIndex: number, extra: Extra) => StrictReactNode

export type HeaderProps<HProps> = PropsWithChildren<HProps>

export type CellDesc<CProps, T, Extra> =
  | CellConfig<CProps, T, Extra>
  | CellConfigGenerator<CProps, T, Extra>
  | StrictReactNode
  | keyof T
  | CellNodeGenerator<T, Extra>

export type CellConfig<CProps, T, Extra> = {
  value: keyof T | StrictReactNode | CellNodeGenerator<T, Extra>
} & Omit<CProps, 'children'>

export type CellConfigGenerator<CProps, T, Extra> = (
  item: T,
  rowIndex: number,
  columnIndex: number,
  extra: Extra
) => CellConfig<CProps, T, Extra>

export type CellNodeGenerator<T, Extra> = (
  item: T,
  rowIndex: number,
  columnIndex: number,
  extra: Extra
) => StrictReactNode

export type CellProps<CProps> = PropsWithChildren<CProps>

export type StrictReactNode = ReactChild | undefined | null | boolean
