import { ComponentType, createElement } from 'react'

export function makeWrap<Props>(target: ComponentType<Props>, wrapper: ComponentType): ComponentType<Props> {
  return (props) => createElement(wrapper, {}, createElement(target, props))
}
