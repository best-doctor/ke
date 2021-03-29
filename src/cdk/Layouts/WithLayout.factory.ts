import { ReactElement } from 'react'

import { Component, LayoutComponent } from './types'

export function makeWithLayout<P, R>(featureFunc: FeatureFunc<P, R>): Component<PropsWithLayout<P, R>>
export function makeWithLayout<P, R>(
  featureFunc: FeatureFunc<P, R>,
  defaultLayout: LayoutComponent<R>
): Component<PropsWithDefaultLayout<P, R>>
export function makeWithLayout<P, R>(
  featureFunc: FeatureFunc<P, R>,
  defaultLayout?: LayoutComponent<R>
): Component<PropsWithDefaultLayout<P, R>> | Component<PropsWithLayout<P, R>> {
  return ({ layout = defaultLayout, ...other }) => {
    const featureData = featureFunc(other as P)
    // Here two way of using function - with default layout and optional props or without layout and with required props
    // so layout would be exists
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return (layout!({ children: featureData }) as unknown) as ReactElement<PropsWithDefaultLayout<P, R>>
  }
}

export type PropsWithLayout<P, R> = P & AddLayoutProps<R>

export type PropsWithDefaultLayout<P, R> = P & Partial<AddLayoutProps<R>>

export interface AddLayoutProps<C> {
  layout: LayoutComponent<C>
}

type FeatureFunc<P, R> = (props: P) => R
