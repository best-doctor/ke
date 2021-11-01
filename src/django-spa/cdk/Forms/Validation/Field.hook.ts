import { useEffect, useState } from 'react'

import { UseValidationResult, ValidationError, ValidationResult } from './Checks'
import { ErrorsData, ErrorsKey, Updater, Validator } from './types'

export function useFieldValidation(
  useLeaf: (key: ErrorsKey) => [ErrorsData, (updater: Updater<ErrorsData>) => void],
  useCheck: (validator: Validator) => UseValidationResult<ValidationError[], ValidationResult>,
  key: ErrorsKey,
  value: unknown,
  validator?: Validator
): UseFieldValidationResult {
  const [leaf, updateLeaf] = useLeaf(key)
  const { validate, inValidating, errors, lastValidated } = useCheck(validator || defaultValidator)
  const [mergedErrors, setMergedErrors] = useState<ValidationError[]>([])

  useEffect(() => {
    updateLeaf((prev) => ({ ...prev, validate }))
  }, [validate, updateLeaf])

  useEffect(() => {
    setMergedErrors(
      ([] as ValidationError[])
        .concat(leaf.lastValidated === value ? leaf.errors || [] : [])
        .concat(lastValidated === value ? errors || [] : [])
    )
  }, [value, errors, leaf.errors, lastValidated, leaf.lastValidated])

  return {
    errors: mergedErrors,
    inValidating: leaf.inValidating || inValidating,
    validate,
    validated: value === lastValidated && value === leaf.lastValidated,
  }
}

function defaultValidator(): Promise<ValidationResult> {
  return Promise.resolve({ success: true })
}

export interface UseFieldValidationResult {
  errors: ValidationError[]
  inValidating: boolean
  validated: boolean
  validate: Validator
}
