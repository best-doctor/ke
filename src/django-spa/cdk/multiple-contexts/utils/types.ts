import { Context } from 'react'

export type ContextsRecord = Record<string, Context<any>>

export type ContextsData<Contexts extends ContextsRecord> = {
  [K in keyof Contexts]: ContextData<Contexts[K]>
}

type ContextData<Ctx> = Ctx extends Context<infer T> ? T : never
