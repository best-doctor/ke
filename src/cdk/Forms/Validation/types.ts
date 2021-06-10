import { Provider, ProviderProps } from 'react'
import { RootContext } from '@cdk/ContextTree'

import { ValidationError, ValidationResult } from './Checks'

export interface ErrorsData {
  errors: ValidationError[] | null
  inValidating: boolean
  lastValidated: unknown
  validate: (v: unknown) => Promise<ValidationResult>
}

export type ErrorsKey = string | number

export type RecordErrors<K extends ErrorsKey> = Record<K, ErrorsData>

export type ArrayErrors = ErrorsData[]

export type Updater<T = unknown> = (prev: T) => T

export type Validator = (value: unknown) => Promise<ValidationResult>

export type RecordValidator = (value: unknown) => Promise<Record<string, ValidationResult>>

export type ArrayValidator = (value: unknown) => Promise<ValidationResult[]>

export type RootProviderDesc = [Provider<RootContext>, ProviderProps<RootContext>]
