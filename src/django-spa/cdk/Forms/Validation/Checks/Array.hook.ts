import { partial } from '@utils/Funcs'

import { ValidationResult } from './types'
import { useCheck } from './Base.hook'

export const useArrayCheck = partial(useCheck, (vr: ValidationResult[]) => vr.map((result) => result.errors || null))
