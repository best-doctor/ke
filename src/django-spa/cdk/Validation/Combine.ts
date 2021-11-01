import { useCallback } from 'react'

import { LeveledValidatedResult, LeveledValidator, RecordValidator, Validator } from './types'

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

export function recordCombine<K extends string>(recordValidators: Record<K, LeveledValidator>): RecordValidator {
  return (val) => {
    if (typeof val !== 'object' || val === null) {
      throw TypeError(`Validator wait for record but got "${JSON.stringify(val)}"`)
    }

    const def: Record<string, LeveledValidatedResult> = Object.fromEntries(
      Object.keys(val).map((key: string) => [
        key,
        {
          success: true,
        },
      ])
    )

    const pairs = Object.entries(recordValidators)
    const keys = pairs.map(([key]) => key)
    const validators = pairs.map(([key, validator]) =>
      (validator as LeveledValidator)((val as Record<string, unknown>)[key])
    )

    return Promise.all(validators).then((results) => {
      const recordResults = Object.fromEntries(results.map((result, index) => [keys[index], result]))
      return { ...def, ...recordResults }
    })
  }
}
