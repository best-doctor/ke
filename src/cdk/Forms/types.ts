import { RefObject } from 'react'

export type RootValue = ArrRoot | RecRoot
export type ArrRoot = unknown[]
export type RecRoot = Record<string | number, unknown>

export type ArrContext = RootValueDesc<ArrRoot> & { setData: (desc: RootValueDesc<ArrRoot>) => void }
export type RecContext = RootValueDesc<RecRoot> & { setData: (desc: RootValueDesc<RecRoot>) => void }

export interface FieldError extends ValidateError {
  relatedRef: RefObject<ControlRefProps | undefined>
}

export interface ControlRefProps {
  focus: () => void
  scrollIntoView: () => void
}

export interface ValueDesc<T> {
  value: T
  errors: FieldError[] | null
}

export interface RootValueDesc<T extends RootValue> {
  value: T
  errors: T extends unknown[] ? (FieldError[] | null)[] : Record<keyof T, FieldError[] | null>
}

export type Validator = (val: unknown) => Promise<ValidatedResult>

export interface ValidateError {
  level: number
  message: string
}

export interface ValidatedResult {
  success: boolean
  errors?: ValidateError[]
}
