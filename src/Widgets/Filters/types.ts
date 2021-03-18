import type { ComponentType } from 'react'

export interface Filter<K extends string> {
  name: K
  control: ComponentType<ControlProps>
}

export type FiltersValue<K extends string> = Record<K, unknown>

interface ControlProps {
  value: unknown
  onChange: (val: unknown) => void
}
