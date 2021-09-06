export type LayoutProps<Children, Props = {}> = Props & {
  children: Children
}

export type LayoutComponent<Children, Props = {}> = (props: LayoutProps<Children, Props>) => JSX.Element

export type Component<P> = (props: P) => JSX.Element
