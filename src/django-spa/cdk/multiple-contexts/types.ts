import { Context, FC, PropsWithChildren, ReactElement } from 'react'
import { PolymorphProps } from '@cdk/types'

export type ContextsRecord = Record<string, Context<any>>

export type ContextData<Ctx> = Ctx extends Context<infer T> ? T : never

export type ContextsData<Contexts extends ContextsRecord> = {
  [K in keyof Contexts]: ContextData<Contexts[K]>
}

export type ContextsControl<Contexts extends ContextsRecord, RootProps = ContextsData<Contexts>> = [
  root: FC<RootProps>,
  makeConsumer: ConsumerMaker<Contexts>
]

export type ConsumerMaker<Contexts extends ContextsRecord> = <
  K extends keyof Contexts,
  ProxiedProps = Pick<ContextsData<Contexts>, K>
>(
  contextKeys: K[],
  proxy?: (ctx: Pick<ContextsData<Contexts>, K>) => ProxiedProps
) => PolymorphComponent<ProxiedProps>

export type PolymorphComponent<RequiredProps> = <TargetProps extends RequiredProps>(
  props: PropsWithChildren<PolymorphProps<RequiredProps, TargetProps>>
) => ReactElement
