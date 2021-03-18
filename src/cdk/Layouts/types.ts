import { FC } from 'react'

export interface LayoutProps<C> {
  children: C
}

export type LayoutComponent<C> = FC<LayoutProps<C>>
