import { ReactElement } from 'react'

export interface LayoutProps<C> {
  children: C
}

export type LayoutComponent<C> = Component<LayoutProps<C>>

export type LayoutElement<C> = ReactElement<LayoutProps<C>>

export type LayoutChildren<L> = L extends LayoutComponent<infer C> ? C : never

export type Component<P> = (props: P) => ReactElement<P>
