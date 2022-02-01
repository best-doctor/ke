import { partial } from '@utils/funcs'

import { ValidationResult } from './types'
import { useCheck } from './Base.hook'

export const useArrayCheck = partial(useCheck, (vr: ValidationResult[]) => vr.map((result) => result.errors || null))
