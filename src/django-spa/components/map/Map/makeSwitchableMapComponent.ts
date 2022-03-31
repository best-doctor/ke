import { ComponentType, createElement, FC } from 'react'
import { useMapProviderContext } from './MapProviderContext'

export function makeSwitchableMapComponent<Props>(components: Record<string, ComponentType<Props>>): FC<Props> {
  return ({ children, ...props }) => {
    const provider = useMapProviderContext()

    if (provider === null || !(provider in components)) {
      throw new Error(
        `Unknown map provider ${JSON.stringify(provider)}. Should be one of: ${JSON.stringify(Object.keys(components))}`
      )
    }

    return createElement(components[provider], props as Props, children)
  }
}
