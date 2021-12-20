import { ComponentType } from 'react'

export type Integrator<Root extends ComponentType, Inners extends Record<string, ComponentType>> = Root & {
  [K in keyof Inners as Capitalize<string & K>]: Inners[K]
}

export type InnerMaker<Context extends IntegratorContext, ExtArgs extends unknown[], R> = <K extends keyof Context>(
  contextKeys: K[],
  ...args: ExtArgs
) => R

export type IntegratorContext = Record<string, any>
