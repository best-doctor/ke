import { Context, FC, PropsWithChildren, ReactElement } from 'react'
import { PolymorphProps } from '@cdk/types'

export type ContextDesc = {}

export type DistributedContextControl<Desc extends ContextDesc, RootProps = Desc> = [
  root: FC<RootProps>,
  makeConsumer: ConsumerMaker<Desc>
]

export type ContextsForDesc<Desc extends ContextDesc> = {
  [K in keyof Desc]: Context<Desc[K]>
}

export type ConsumerMaker<CtxDesc extends ContextDesc> = <K extends keyof CtxDesc, ProxiedProps = Pick<CtxDesc, K>>(
  contextKeys: K[],
  proxy?: (ctx: Pick<CtxDesc, K>) => ProxiedProps
) => <TargetProps extends ProxiedProps>(
  props: PropsWithChildren<PolymorphProps<ProxiedProps, TargetProps>>
) => ReactElement

export type ContextData<Ctx> = Ctx extends Context<infer T> ? T : never

export type ContextsData<Contexts> = {
  [K in keyof Contexts]: ContextData<Contexts[K]>
}
