import { partial } from '@utils/funcs'

import { ValidationError, ValidationResult } from './types'
import { useCheck } from './Base.hook'

export const useRecordCheck = partial(
  useCheck,
  (vr: Record<string | number, ValidationResult>) =>
    Object.fromEntries(Object.entries(vr).map(([key, result]) => [key, result.errors || null])) as Record<
      string | number,
      ValidationError[] | null
    >
)
