export interface LayoutProps<C> {
  children: C
}

export type LayoutComponent<Children> = (props: LayoutProps<Children>) => JSX.Element

export type Component<P> = (props: P) => JSX.Element
