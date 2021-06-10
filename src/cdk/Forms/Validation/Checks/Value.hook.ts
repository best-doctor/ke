import { partial } from '@utils/Funcs'

import { ValidationResult } from './types'
import { useCheck } from './Base.hook'

export const useValueCheck = partial(useCheck, (vr: ValidationResult) => vr.errors || null)
