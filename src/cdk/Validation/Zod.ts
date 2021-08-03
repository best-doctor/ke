import { useCallback } from 'react'
import { ZodError } from 'zod'

import { LeveledValidatedResult, RecordValidator, Validator } from './types'

export function useZod(schema: ZodType): Validator {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useCallback(convertZod(schema), [schema])
}

export function convertZod(schema: ZodType): Validator {
  return (val) =>
    schema.safeParseAsync(val).then((parsed) => ({
      success: parsed.success,
      errors: !parsed.success ? parsed.error.issues.map((issue) => issue.message) : undefined,
    }))
}

export function convertZodRecord(schema: ZodType, level: number): RecordValidator {
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

    return schema.safeParseAsync(val).then((parsed) => {
      if (parsed.success) {
        return def
      }

      const result: Record<string, LeveledValidatedResult> = Object.fromEntries(
        Object.entries(parsed.error.flatten().fieldErrors).map(([key, messages]) => [
          key,
          {
            success: false,
            errors: messages.map((message) => ({
              level,
              message,
            })),
          },
        ])
      )

      return {
        ...def,
        ...result,
      }
    })
  }
}

interface ZodType {
  safeParseAsync: (
    x: unknown
  ) => Promise<
    | {
        success: true
      }
    | {
        success: false
        error: ZodError
      }
  >
}
