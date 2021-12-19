import { Context, PropsWithChildren, ReactElement } from 'react'
import { PolymorphProps } from '@cdk/types'

export type ContextsRecord = Record<string, Context<any>>

export type ContextData<Ctx> = Ctx extends Context<infer T> ? T : never

export type ContextsData<Contexts extends ContextsRecord> = {
  [K in keyof Contexts]: ContextData<Contexts[K]>
}

export type PolymorphComponent<RequiredProps> = <TargetProps extends RequiredProps>(
  props: PropsWithChildren<PolymorphProps<RequiredProps, TargetProps>>
) => ReactElement
