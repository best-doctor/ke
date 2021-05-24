import { Provider, ProviderProps, RefObject } from 'react'

export type RootProviderDesc = [Provider<RootContext>, ProviderProps<RootContext>]

export type RootContext = [
  (key: string | number) => FieldData,
  (key: string | number, updater: (val: FieldData) => FieldData) => void
]

export type FieldKey = string | number

export interface FieldData<T = unknown> {
  value: T
  errors: FieldError[] | null
  relatedRef: RefObject<ControlRefProps>
  isTouched: boolean
  inValidating: boolean
}

export type FieldUpdater = (prev: FieldData) => FieldData

export type RecordData<K extends FieldKey = FieldKey> = Record<K, FieldData>

export type ArrayData<T = unknown> = FieldData<T>[]

export interface FormData<K extends FieldKey> {
  value: Record<K, unknown>
  errors: Record<K, FieldError[] | null>
  isTouched: boolean
  inValidating: boolean
  maxErrorLevel: number | null
}

export interface ControlRefProps {
  focus: () => void
  scrollIntoView: () => void
}

export interface FieldError {
  level: number
  message: string
}

export type FieldValidator = (val: unknown) => Promise<FieldValidateResult>

export type RecordValidator<K extends FieldKey> = (val: Record<K, unknown>) => Promise<Record<K, FieldValidateResult>>

export type ArrayValidator = (val: unknown[]) => Promise<FieldValidateResult[]>

export interface FieldValidateResult {
  success: boolean
  errors?: FieldError[]
}
