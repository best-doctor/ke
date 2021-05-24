import { useCallback } from 'react'
import { ZodError } from 'zod'

import { Validator } from './types'

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
