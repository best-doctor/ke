import { useEffect, useState } from 'react'
import { isEqual } from '@utils/Types'

import { ValidationError, ValidationState } from './Checks'
import { ErrorsData, Updater, RootProviderDesc, ArrayErrors, ArrayValidator } from './types'

export function useArrayValidation(
  rootHook: (array: ArrayErrors, onChange: (updater: Updater<ArrayErrors>) => void) => RootProviderDesc,
  checkHook: (
    array: unknown,
    validator: ArrayValidator
  ) => ValidationState<(ValidationError[] | null)[]> & { validate: ArrayValidator },
  value: unknown[],
  validator: ArrayValidator
): [RootProviderDesc, ArrayValidator] {
  const [array, setArray] = useState(() => makeDefaultArray(value))
  const { validate, errors, inValidating, lastValidated } = checkHook(value, validator)

  useEffect(() => {
    setArray((prev) => {
      if (errors && prev.length !== errors.length) {
        throw new TypeError(
          `Errors array length (${errors.length}) not equal data array length (${prev.length}). Possible invalid validator.`
        )
      }
      const ext = (errors || []).map((errs, index) => ({
        ...prev[index],
        lastValidated: (lastValidated as unknown[])[index],
        inValidating,
        errors: errs,
      }))

      return updateArray(prev, ext)
    })
  }, [errors, lastValidated, inValidating])

  return [rootHook(array, setArray), validate]
}

const defaultData: ErrorsData = {
  inValidating: false,
  errors: null,
  lastValidated: undefined,
  validate: () => Promise.resolve({ success: true }),
}

function makeDefaultArray(value: unknown[]): ArrayErrors {
  return value.map(() => ({ ...defaultData }))
}

function updateArray(prev: ArrayErrors, ext: ArrayErrors): ArrayErrors {
  const updated = prev.map((prevData, index) => (isEqual(prevData, ext[index]) ? prevData : ext[index]))

  return isEqual(prev, updated) ? prev : updated
}
