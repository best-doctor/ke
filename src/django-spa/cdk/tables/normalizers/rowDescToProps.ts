import { DataRowConfigGenerator, DataRowDesc, HeaderRowConfigGenerator, HeaderRowDesc, RowProps } from './types'

export function dataRowDescToProps<RProps, T, Extra>(
  rowDesc: DataRowDesc<RProps, T, Extra>,
  item: T,
  rowIndex: number,
  extraGenerator: (item: unknown, rowIndex: number) => Extra
): RowProps<RProps> {
  if (isRowGenerator(rowDesc)) {
    return rowDesc(item, rowIndex, extraGenerator(item, rowIndex))
  }

  return rowDesc
}

export function headerRowDescToProps<RProps, Extra>(
  headerRowDesc: HeaderRowDesc<RProps, Extra>,
  extraGenerator: () => Extra
): RowProps<RProps> {
  if (isRowGenerator(headerRowDesc)) {
    return headerRowDesc(extraGenerator())
  }

  return headerRowDesc
}

function isRowGenerator<RProps, T, Extra>(
  rowDesc: DataRowDesc<RProps, T, Extra>
): rowDesc is DataRowConfigGenerator<RProps, T, Extra>
function isRowGenerator<RProps, Extra>(
  rowDesc: HeaderRowDesc<RProps, Extra>
): rowDesc is HeaderRowConfigGenerator<RProps, Extra>
function isRowGenerator<RProps, T, Extra>(
  rowDesc: DataRowDesc<RProps, T, Extra> | HeaderRowDesc<RProps, Extra>
): rowDesc is DataRowConfigGenerator<RProps, T, Extra> | HeaderRowConfigGenerator<RProps, Extra> {
  return typeof rowDesc === 'function'
}
