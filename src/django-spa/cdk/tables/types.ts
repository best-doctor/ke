import { ComponentProps, ComponentType, PropsWithChildren } from 'react'

import { CellDesc, DataRowDesc, HeaderDesc, HeaderRowDesc } from './normalizers'

export type TableProps<
  T = unknown,
  Props extends Record<keyof TableComponents, unknown> = Record<keyof TableComponents, {}>,
  Extra extends ExtraArgs = ExtraArgs
> = Props['table'] & {
  data: readonly T[]
  getKey?: (item: T, rowIndex: number) => string | number
  columns: readonly ColumnConfig<T, Props['headerCell'], Props['dataCell'], Extra['headerCell'], Extra['dataCell']>[]
  dataRow?: DataRowDesc<Props['dataRow'], T, Extra['dataRow']>
  headerRow?: HeaderRowDesc<Props['dataRow'], Extra['headerRow']>
  children?: never
}

export interface ColumnConfig<
  T = unknown,
  HProps = unknown,
  CProps = unknown,
  HeaderExtra = unknown,
  CellExtra = unknown
> {
  name: string | number
  header: HeaderDesc<HProps, HeaderExtra>
  cell: CellDesc<CProps, T, CellExtra>
}

export type TableComponentProps<Components extends TableComponents> = {
  [K in keyof TableComponents]: ComponentProps<Components[K]>
}

export interface TableComponents {
  // unknown блокирует возможность передавать указывать компоненты с какими-либо
  // пропсами вообще
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  table: ComponentType<any>
  thead: ComponentType
  tbody: ComponentType
  headerRow: ComponentType
  dataRow: ComponentType
  headerCell: ComponentType
  dataCell: ComponentType
}

// any для корректной работы infer и возможности добавлять в таблицу плагины
// с любыми дополнительными props. unknown этого не позволяет.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface TablePlugin<ExtProps = any, Extra extends ExtraArgs = ExtraArgs> {
  before?: (props: TableProps & ExtProps) => [TableProps, ExtraArgGenerators<Extra>?]
  after?: (props: NormalizedTableProps<ExtProps>) => NormalizedTableProps
}

export type PluginProps<Plugin extends TablePlugin> = Plugin extends TablePlugin<infer P> ? P : never

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type PluginExtra<Plugin extends TablePlugin> = Plugin extends TablePlugin<any, infer E> ? E : never

export interface NormalizedTableProps<TProps = unknown, RProps = unknown, HProps = unknown, CProps = unknown> {
  table: TProps
  thead: NormalizedRowProps<RProps, HProps>
  tbody: RowCellsProps<NormalizedRowProps<RProps, CProps>>
}

export type ExtraKey = 'headerRow' | 'headerCell' | 'dataRow' | 'dataCell'

export type ExtraArgGenerators<Extra extends ExtraArgs = ExtraArgs> = Pick<
  {
    headerRow: () => Exclude<Extra['headerRow'], undefined>
    headerCell: (columnIndex: number) => Exclude<Extra['headerCell'], undefined>
    dataRow: (item: unknown, rowIndex: number) => Exclude<Extra['dataRow'], undefined>
    dataCell: (item: unknown, rowIndex: number, columnIndex: number) => Exclude<Extra['dataCell'], undefined>
  },
  Extract<keyof Extra, ExtraKey>
>

export type ExtraArgs = Partial<Record<ExtraKey, unknown>>

interface NormalizedRowProps<RProps, CProps> {
  row: Omit<RProps, 'children'> | {}
  cells: RowCellsProps<CProps | PropsWithChildren<{}>>
}

type RowCellsProps<CProps> = [key: string | number, props: PropsWithChildren<CProps>][]
