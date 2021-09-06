import { LayoutComponent, LayoutProps } from './types'

export function makeSlots<K extends string>(
  mapping: (elements: SlotElements<K>) => JSX.Element
): LayoutComponent<SlotElements<K>> {
  return ({ children }: LayoutProps<SlotElements<K>>): JSX.Element => mapping(children)
}

export type SlotElements<K extends string> = {
  [P in K]?: JSX.Element | string
}
