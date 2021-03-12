import type { ComponentType } from 'react'

export interface Filter<K extends string, FV = unknown, CV = unknown> {
  name: K
  control: ComponentType<ControlProps>
  toControlValue?: (v: FV) => Promise<CV>
  fromControlValue?: (v: CV) => Promise<FV>
}

export type FiltersValue<K extends string> = Record<K, unknown>

interface ControlProps {
  value: unknown
  onChange: (val: unknown) => void
}
