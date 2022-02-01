import { partial } from '@utils/funcs'

import { ValidationResult } from './types'
import { useCheck } from './Base.hook'

export const useValueCheck = partial(useCheck, (vr: ValidationResult) => vr.errors || null)
