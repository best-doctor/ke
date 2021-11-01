export interface ValidationError {
  level: number
  message: string
}

export interface ValidationResult {
  success: boolean
  errors?: ValidationError[]
}

export interface ValidationState<E> {
  errors: E | null
  inValidating: boolean
  lastValidated: unknown
}
