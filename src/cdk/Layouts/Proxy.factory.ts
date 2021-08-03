import { ReactElement } from 'react'

import { LayoutComponent, LayoutProps } from './types'

export function makeProxied<SC, TC>(
  layout: LayoutComponent<SC>,
  mapping: (targetChildren: TC) => SC
): LayoutComponent<TC> {
  return ({ children }: LayoutProps<TC>) =>
    (layout({ children: mapping(children) }) as unknown) as ReactElement<LayoutProps<TC>>
}
