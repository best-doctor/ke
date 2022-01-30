import { ReactElement } from 'react'

export type LayoutProps<Children, Props = {}> = Props & {
  children: Children
}

export type LayoutComponent<Children, Props = {}> = (props: LayoutProps<Children, Props>) => ReactElement

export type Component<P> = (props: P) => ReactElement
