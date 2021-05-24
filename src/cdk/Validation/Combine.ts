import { useCallback } from 'react'

import { LeveledValidatedResult, LeveledValidator, Validator } from './types'

export function useCombine(validatorsWithLevel: { level: number; validator: Validator }[]): LeveledValidator {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useCallback(combine(validatorsWithLevel), [validatorsWithLevel])
}

export function combine(validatorsWithLevel: { level: number; validator: Validator }[]): LeveledValidator {
  const levels = validatorsWithLevel.map((validatorWithLevel) => validatorWithLevel.level)
  const validators = validatorsWithLevel.map((validatorWithLevel) => validatorWithLevel.validator)

  return (val) =>
    Promise.all(validators.map((validator) => validator(val))).then((results) =>
      results.reduce(
        (acc, result, index) => ({
          success: acc.success && result.success,
          errors: result.success
            ? acc.errors
            : (acc.errors || []).concat(
                (result.errors as string[]).map((message) => ({
                  level: levels[index],
                  message,
                }))
              ),
        }),
        {
          success: true,
        } as LeveledValidatedResult
      )
    )
}
