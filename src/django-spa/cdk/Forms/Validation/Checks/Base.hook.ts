import { useCallback, useRef, useState } from 'react'
import { useIsMounted } from '@cdk/Hooks'

import { ValidationState } from './types'

const defaultState = {
  errors: null,
  inValidating: false,
  lastValidated: undefined,
}

export function useCheck<ValidatorResult, ErrorsState>(
  converter: (vr: ValidatorResult) => ErrorsState,
  validator: (v: unknown) => Promise<ValidatorResult>
): UseValidationResult<ErrorsState, ValidatorResult> {
  const [state, setState] = useState<ValidationState<ErrorsState>>(defaultState)

  const validateCountRef = useRef<number>(0)
  const isMountedRef = useIsMounted()

  const validate = useCallback(
    (v: unknown) => {
      const validateCount = ++validateCountRef.current

      setState((prev) => ({ ...prev, inValidating: true }))
      return validator(v).then((result) => {
        if (validateCount === validateCountRef.current && isMountedRef.current) {
          setState((prev) => ({ ...prev, inValidating: false, errors: converter(result), lastValidated: v }))
        }

        return result
      })
    },
    [validator, isMountedRef, converter]
  )

  return {
    ...state,
    validate,
  }
}

export type UseValidationResult<ErrorsState, ValidatorResult> = ValidationState<ErrorsState> & {
  validate: (v: unknown) => Promise<ValidatorResult>
}
