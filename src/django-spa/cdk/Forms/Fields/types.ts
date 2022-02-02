import { Provider, ProviderProps, RefObject } from 'react'
import { RootContext } from '../../context-tree'

export type RootProviderDesc = [Provider<RootContext>, ProviderProps<RootContext>]

export type FieldKey = string | number

export interface FieldData<T = unknown> {
  value: T
  relatedRef: RefObject<ControlRefProps> | null
  isTouched: boolean
}

export type Updater<T = unknown> = (prev: T) => T

export type RecordData<K extends FieldKey = FieldKey> = Record<K, FieldData>

export type ArrayData<T = unknown> = FieldData<T>[]

export interface ControlRefProps {
  focus: () => void
  scrollIntoView: () => void
}
