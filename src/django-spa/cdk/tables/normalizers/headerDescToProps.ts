import { isValidElement, PropsWithChildren } from 'react'

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
    children: value,
  }
}

function isHeaderConfig<HProps, Extra>(headerDesc: HeaderDesc<HProps, Extra>): headerDesc is HeaderConfig<HProps> {
  return !!headerDesc && typeof headerDesc === 'object' && 'value' in headerDesc
}

function isHeaderGenerator<HProps, Extra>(
  headerDesc: HeaderDesc<HProps, Extra>
): headerDesc is HeaderConfigGenerator<HProps, Extra> | HeaderNodeGenerator<Extra> {
  return typeof headerDesc === 'function' && !isValidElement(headerDesc)
}
