export type Validator = (val: unknown) => Promise<ValidatedResult>

export type LeveledValidator = (val: unknown) => Promise<LeveledValidatedResult>

export type RecordValidator = (val: unknown) => Promise<Record<string, LeveledValidatedResult>>

export interface ValidatedResult {
  success: boolean
  errors?: string[]
}

export interface LeveledValidatedResult {
  success: boolean
  errors?: LeveledError[]
}

export interface LeveledError {
  level: number
  message: string
}
