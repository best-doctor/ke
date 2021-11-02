import { isValidElement, PropsWithChildren, ReactNode, ReactText } from 'react'

import { CellConfig, CellConfigGenerator, CellDesc, CellNodeGenerator, CellProps } from './types'

export function cellDescToProps<T, CProps, Extra>(
  cellDesc: CellDesc<CProps, T, Extra>,
  item: T,
  rowIndex: number,
  columnIndex: number,
  extraGenerator: (item: unknown, rowIndex: number, cellIndex: number) => Extra
): CellProps<CProps> | PropsWithChildren<{}> {
  const configOrNode = isCellGenerator(cellDesc)
    ? cellDesc(item, rowIndex, columnIndex, extraGenerator(item, rowIndex, columnIndex))
    : cellDesc

  if (typeof configOrNode === 'string' && typeof item === 'object' && configOrNode in item) {
    return {
      children: (item as Record<string, unknown>)[configOrNode] as ReactText,
    }
  }

  const { value, ...restProps } = isCellConfig(configOrNode) ? configOrNode : { value: configOrNode }

  return {
    ...restProps,
    children: isCellNodeGenerator(value)
      ? value(item, rowIndex, columnIndex, extraGenerator(item, rowIndex, columnIndex))
      : value,
  }
}

function isCellConfig<T, CProps, Extra>(
  cellDesc: CellDesc<T, CProps, Extra>
): cellDesc is CellConfig<T, CProps, Extra> {
  return !!cellDesc && typeof cellDesc === 'object' && 'value' in cellDesc
}

function isCellGenerator<T, CProps, Extra>(
  cellDesc: CellDesc<CProps, T, Extra>
): cellDesc is CellConfigGenerator<CProps, T, Extra> | CellNodeGenerator<T, Extra> {
  return typeof cellDesc === 'function' && !isValidElement(cellDesc)
}

function isCellNodeGenerator<T, Extra>(
  value: ReactNode | CellNodeGenerator<T, Extra>
): value is CellNodeGenerator<T, Extra> {
  return typeof value === 'function' && !isValidElement(value)
}
