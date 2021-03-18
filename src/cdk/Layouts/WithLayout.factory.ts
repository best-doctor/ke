import { FC } from 'react'

import { LayoutComponent } from './types'

export function makeWithLayout<FeatureProps, FeatureReturn, LayoutChildren>(
  featureFunc: FeatureFunc<FeatureProps, FeatureReturn>
): FC<PropsWithLayout<FeatureProps, FeatureReturn, LayoutChildren>>
export function makeWithLayout<FeatureProps, FeatureReturn, LayoutChildren>(
  featureFunc: FeatureFunc<FeatureProps, FeatureReturn>,
  defaultLayout: LayoutComponent<LayoutChildren>,
  defaultMapping: (v: FeatureReturn) => LayoutChildren
): FC<PropsWithDefaultLayout<FeatureProps, FeatureReturn, LayoutChildren>>
export function makeWithLayout<FeatureProps, FeatureReturn, LayoutChildren>(
  featureFunc: FeatureFunc<FeatureProps, FeatureReturn>,
  defaultLayout?: LayoutComponent<LayoutChildren>,
  defaultMapping?: (v: FeatureReturn) => LayoutChildren
):
  | FC<PropsWithLayout<FeatureProps, FeatureReturn, LayoutChildren>>
  | FC<PropsWithDefaultLayout<FeatureProps, FeatureReturn, LayoutChildren>> {
  return ({ layout = defaultLayout, children: makeLayoutChildren = defaultMapping, ...other }) => {
    const featureData = featureFunc(other as FeatureProps)
    /* eslint-disable @typescript-eslint/no-non-null-assertion */
    // Here two way of using function - with default layout and optional props or without layout and with required props
    // so layout and makeLayoutChildren would be exists
    const layoutChildren = makeLayoutChildren!(featureData)
    return layout!({ children: layoutChildren })
    /* eslint-enable @typescript-eslint/no-non-null-assertion */
  }
}

export type PropsWithLayout<FeatureProps, FeatureReturn, LayoutChildren> = FeatureProps &
  ExtLayoutProps<FeatureReturn, LayoutChildren>

export type PropsWithDefaultLayout<FeatureProps, FeatureReturn, LayoutChildren> = FeatureProps &
  Partial<ExtLayoutProps<FeatureReturn, LayoutChildren>>

export interface ExtLayoutProps<FeatureReturn, LayoutChildren> {
  layout: LayoutComponent<LayoutChildren>
  children: (v: FeatureReturn) => LayoutChildren
}

type FeatureFunc<P, R> = (props: P) => R
