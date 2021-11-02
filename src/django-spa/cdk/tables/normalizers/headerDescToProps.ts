import { isValidElement, PropsWithChildren, ReactNode } from 'react'

import { HeaderConfig, HeaderConfigGenerator, HeaderDesc, HeaderNodeGenerator, HeaderProps } from './types'

export function headerDescToProps<HProps, Extra>(
  headerDesc: HeaderDesc<HProps, Extra>,
  columnIndex: number,
  extraGenerator: (columnIndex: number) => Extra
): HeaderProps<HProps> | PropsWithChildren<{}> {
  const configOrNode = isHeaderGenerator(headerDesc) ? headerDesc(columnIndex, extraGenerator(columnIndex)) : headerDesc

  const { value, ...restConfig } = isHeaderConfig(configOrNode) ? configOrNode : { value: configOrNode }

  return {
    ...restConfig,
    children: isHeaderNodeGenerator(value) ? value(columnIndex, extraGenerator(columnIndex)) : value,
  }
}

function isHeaderConfig<HProps, Extra>(
  headerDesc: HeaderDesc<HProps, Extra>
): headerDesc is HeaderConfig<HProps, Extra> {
  return !!headerDesc && typeof headerDesc === 'object' && 'value' in headerDesc
}

function isHeaderGenerator<HProps, Extra>(
  headerDesc: HeaderDesc<HProps, Extra>
): headerDesc is HeaderConfigGenerator<HProps, Extra> | HeaderNodeGenerator<Extra> {
  return typeof headerDesc === 'function' && !isValidElement(headerDesc)
}

function isHeaderNodeGenerator<Extra>(
  value: ReactNode | HeaderNodeGenerator<Extra>
): value is HeaderNodeGenerator<Extra> {
  return typeof value === 'function' && !isValidElement(value)
}
