import { RefObject, useCallback, useEffect, useRef, useState } from 'react'

import { ValidatedResult, Validator, ValidateError, ControlRefProps } from './types'
import { useValue } from './Value.hook'

export function useField(
  key: string | number,
  controlRef?: RefObject<ControlRefProps | undefined>,
  validate: Validator = defaultValidate
): UseFieldResult<unknown> {
  const { value, setValue } = useValue(key)
  const [errors, setErrors] = useState<ValidateError[]>([])
  const defaultRef = useRef()

  useEffect(() => {
    validate(value).then((result) => {
      setErrors(result.errors || [])
      setValue({
        value,
        errors: (result.errors || []).map((validateError) => ({
          ...validateError,
          relatedRef: controlRef || defaultRef,
        })),
      })
    })
  }, [value, validate, setValue, controlRef])

  const onChange = useCallback(
    (val) => {
      setValue({
        value: val,
        errors: null,
      })
    },
    [setValue]
  )

  return {
    value,
    onChange,
    errors,
  }
}

function defaultValidate(): Promise<ValidatedResult> {
  return Promise.resolve({ success: true })
}

interface UseFieldResult<T> {
  value: T
  onChange: (val: T) => void
  errors: readonly ValidateError[]
}
