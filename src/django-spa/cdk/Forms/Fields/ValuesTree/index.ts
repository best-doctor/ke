import { partial } from '@utils/funcs'
import { useLeaf, useArrayRoot, useRecordRoot } from '../../../context-tree'

import { ValuesContext } from './ValuesTree.context'

export const useValuesLeaf = partial(useLeaf, ValuesContext)
export const useValuesRecord = partial(useRecordRoot, ValuesContext)
export const useValuesArray = partial(useArrayRoot, ValuesContext)
