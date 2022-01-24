import { ComponentProps, ComponentType, createElement, FC } from 'react'

import { InnerComponents, Integrator } from './types'

export function proxyIntegratorRoot<BaseRoot extends ComponentType<any>, Inners extends InnerComponents, ProxyProps>(
  base: Integrator<BaseRoot, Inners>,
  proxy: (props: ProxyProps) => ComponentProps<BaseRoot>
): Integrator<FC<ProxyProps>, Inners> {
  const newRoot: FC<ProxyProps> = (props) => createElement(base, proxy(props))

  Object.entries(base).forEach(([key, value]) => {
    ;(newRoot as Integrator<FC<ProxyProps>, Inners>)[key as keyof Inners] = value
  })

  return newRoot as Integrator<FC<ProxyProps>, Inners>
}
