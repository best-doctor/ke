import type { ComponentType } from 'react'
import { RefObject } from 'react'
import { ControlRefProps } from '@cdk/Forms'

export interface Filter<K extends string> {
  name: K
  control: ComponentType<ControlProps>
}

export type FiltersValue<K extends string> = Record<K, any>

interface ControlProps {
  value: unknown
  onChange: (val: unknown) => void
  ref: RefObject<ControlRefProps | undefined>
}
