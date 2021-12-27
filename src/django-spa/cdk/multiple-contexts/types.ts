import { Context } from 'react'
import { PolymorphComponent } from '~types'

export type ContextsRecord = Record<string, Context<any>>

export type ContextData<Ctx> = Ctx extends Context<infer T> ? T : never

export type ContextsData<Contexts extends ContextsRecord> = {
  [K in keyof Contexts]: ContextData<Contexts[K]>
}

export type ConsumerMaker<Contexts extends ContextsRecord> = <
  K extends keyof Contexts,
  ConsumerProps = ContextsData<Pick<Contexts, K>>
>(
  keys: K[],
  proxy?: (data: ContextsData<Pick<Contexts, K>>) => ConsumerProps
) => PolymorphComponent<ConsumerProps>
