import { partial } from '@utils/Funcs'
import { useLeaf, useArrayRoot, useRecordRoot } from '../../../ContextTree'

import { ValuesContext } from './ValuesTree.context'

export const useValuesLeaf = partial(useLeaf, ValuesContext)
export const useValuesRecord = partial(useRecordRoot, ValuesContext)
export const useValuesArray = partial(useArrayRoot, ValuesContext)
