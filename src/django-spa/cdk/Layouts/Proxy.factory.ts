import { LayoutComponent, LayoutProps } from './types'

export function makeProxied<SourceChildren, TargetChildren>(
  layout: LayoutComponent<SourceChildren>,
  mapping: (targetChildren: TargetChildren) => SourceChildren
): LayoutComponent<TargetChildren> {
  return ({ children }: LayoutProps<TargetChildren>) => layout({ children: mapping(children) })
}
