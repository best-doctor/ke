import { ReactElement } from 'react'

import { Component, LayoutComponent } from './types'

export function makeWithLayout<P, R>(featureFunc: FeatureFunc<P, R>): Component<PropsWithLayout<P, R>>
export function makeWithLayout<P, R>(
  featureFunc: FeatureFunc<P, R>,
  defaultLayout: LayoutComponent<R> | LayoutDescriptor<R>
): Component<PropsWithDefaultLayout<P, R>>
export function makeWithLayout<P, R>(
  featureFunc: FeatureFunc<P, R>,
  defaultLayout?: LayoutComponent<R> | LayoutDescriptor<R>
): Component<PropsWithDefaultLayout<P, R>> | Component<PropsWithLayout<P, R>> {
  return ({ layout = defaultLayout, ...other }) => {
    const featureData = featureFunc(other as P)
    // Here two way of using function - with default layout and optional props or without layout and with required props
    // so layout would be exists
    /* eslint-disable @typescript-eslint/no-non-null-assertion */
    if (isLayoutDescriptor(layout!)) {
      const { component, ...defaultSlots } = layout
      return component({ children: { ...defaultSlots, ...featureData } }) as unknown as ReactElement<
        PropsWithDefaultLayout<P, R>
      >
    }

    return layout!({ children: featureData }) as unknown as ReactElement<PropsWithDefaultLayout<P, R>>
    /* eslint-enable @typescript-eslint/no-non-null-assertion */
  }
}

export type PropsWithLayout<P, R> = P & AddLayoutProps<R>

export type PropsWithDefaultLayout<P, R> = P & Partial<AddLayoutProps<R>>

export interface AddLayoutProps<C> {
  layout: LayoutComponent<C> | LayoutDescriptor<C>
}

function isLayoutDescriptor<C>(layout: LayoutComponent<C> | LayoutDescriptor<C>): layout is LayoutDescriptor<C> {
  return 'component' in layout
}

type LayoutDescriptor<C> = {
  component: LayoutComponent<C>
} & Partial<C>

type FeatureFunc<P, R> = (props: P) => R
