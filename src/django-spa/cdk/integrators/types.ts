import { ComponentProps, ComponentType } from 'react'

export type Integrator<
  Root extends ComponentType<any> = ComponentType,
  Inners extends InnerComponents = InnerComponents
> = Root & {
  [K in keyof Inners]: Inners[K]
}

export type IntegratorInners<Int> = Int extends Integrator<any, infer Inners> ? Inners : never

export type IntegratorProps<Int> = Int extends Integrator<infer Root, any> ? ComponentProps<Root> : never

export type InnerComponents = Record<string, ComponentType<any>>
