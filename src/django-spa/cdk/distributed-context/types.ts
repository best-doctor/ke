import { Context, PropsWithChildren, ReactElement } from 'react'
import { PolymorphProps } from '@cdk/types'

export type ContextDesc = Record<string, unknown>

export type ContextsForDesc<Desc extends ContextDesc> = Record<keyof Desc, Context<Desc[keyof Desc]>>

export type ConsumerMaker<CtxDesc extends ContextDesc> = <K extends keyof CtxDesc, ProxiedProps = Pick<CtxDesc, K>>(
  contextKeys: K[],
  proxy?: (ctx: Pick<CtxDesc, K>) => ProxiedProps
) => <TargetProps extends ProxiedProps>(
  props: PropsWithChildren<PolymorphProps<ProxiedProps, TargetProps>>
) => ReactElement
