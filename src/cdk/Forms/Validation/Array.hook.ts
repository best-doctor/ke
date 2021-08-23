import { useCallback, useEffect, useState } from 'react'
import { isEqual } from '@utils/Types'

import { ValidationError, ValidationResult, ValidationState } from './Checks'
import { ErrorsData, Updater, RootProviderDesc, ArrayErrors, ArrayValidator } from './types'

/**
 * Хук для обработки валидации на массивах полей
 *
 * @param rootHook - хук для создания узла в контексте формы с массивом данных по валидации
 * @param checkHook - хук для обёртки асинхронной валидации
 * @param value - валидируемое значение
 * @param validator - функция-валидатор
 */
export function useArrayValidation(
  rootHook: (
    array: ArrayErrors,
    onChange: (updater: Updater<ArrayErrors>) => void,
    getKey: (value: unknown, index: number) => string | number
  ) => RootProviderDesc,
  checkHook: (
    validator: ArrayValidator
  ) => ValidationState<(ValidationError[] | null)[]> & { validate: ArrayValidator },
  value: unknown[],
  validator?: ArrayValidator
): UseArrayValidationResult {
  const [array, setArray] = useState(() => makeDefaultArray(value))
  const { validate, errors, inValidating, lastValidated } = checkHook(validator || defaultValidator)

  useEffect(() => {
    setArray((prev) => {
      if (errors && prev.length !== errors.length) {
        throw new TypeError(
          `Errors array length (${errors.length}) not equal data array length (${prev.length}). Possible invalid validator.`
        )
      }
      const ext = (errors || (new Array(prev.length).fill(null) as null[])).map((fieldErrors, index) => ({
        ...prev[index],
        lastValidated: lastValidated ? (lastValidated as unknown[])[index] : undefined,
        inValidating,
        errors: fieldErrors,
      }))

      return updateArray(prev, ext)
    })
  }, [errors, lastValidated, inValidating])

  const fieldValidators = array.map((errorData) => errorData.validate)
  const recursiveValidate = useCallback(
    async (v: unknown) => {
      if (!Array.isArray(v)) {
        throw new TypeError(`Try to validate not array type "${JSON.stringify(v)}"`)
      }

      const arrayResult = await validate(v)
      const fieldResults = await Promise.all(fieldValidators.map((fieldValidator, index) => fieldValidator(v[index])))

      const mergedResult: ValidationResult[] = []
      for (let i = 0; i < arrayResult.length || i < fieldResults.length; i++) {
        const success = arrayResult[i]?.success && fieldResults[i]?.success
        mergedResult[i] = { success }
        if (!success) {
          mergedResult[i].errors = (arrayResult[i]?.errors || []).concat(fieldResults[i]?.errors || [])
        }
      }

      return mergedResult
    },
    // We depend on values not arrays
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [...fieldValidators, validate]
  )

  return {
    errorsRoot: rootHook(array, setArray, returnIndex),
    arrayValidate: validate,
    recursiveValidate,
  }
}

const defaultData: ErrorsData = {
  inValidating: false,
  errors: null,
  lastValidated: undefined,
  validate: () => Promise.resolve({ success: true }),
}

function returnIndex(_: unknown, index: number): number {
  return index
}

function defaultValidator(v: unknown): Promise<ValidationResult[]> {
  if (!Array.isArray(v)) {
    throw new TypeError(`Try to validate not array type "${JSON.stringify(v)}"`)
  }

  return Promise.resolve(v.map(() => ({ success: true })))
}

function makeDefaultArray(value: unknown[]): ArrayErrors {
  return value.map(() => ({ ...defaultData }))
}

function updateArray(prev: ArrayErrors, ext: ArrayErrors): ArrayErrors {
  const updated = prev.map((prevData, index) => (isEqual(prevData, ext[index]) ? prevData : ext[index]))

  return isEqual(prev, updated) ? prev : updated
}

export interface UseArrayValidationResult {
  errorsRoot: RootProviderDesc
  arrayValidate: (v: unknown) => Promise<ValidationResult[]>
  recursiveValidate: (v: unknown) => Promise<ValidationResult[]>
}
