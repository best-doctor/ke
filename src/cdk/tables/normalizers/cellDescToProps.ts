import { isValidElement, PropsWithChildren, ReactText } from 'react'

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

  if (isCellConfig(configOrNode)) {
    const { value, ...restProps } = configOrNode
    return {
      ...restProps,
      children: value,
    }
  }

  return { children: configOrNode }
}

function isCellConfig<T, CProps, Extra>(cellDesc: CellDesc<T, CProps, Extra>): cellDesc is CellConfig<T, CProps> {
  return !!cellDesc && typeof cellDesc === 'object' && 'value' in cellDesc
}

function isCellGenerator<T, CProps, Extra>(
  cellDesc: CellDesc<CProps, T, Extra>
): cellDesc is CellConfigGenerator<CProps, T, Extra> | CellNodeGenerator<T, Extra> {
  return typeof cellDesc === 'function' && !isValidElement(cellDesc)
}
