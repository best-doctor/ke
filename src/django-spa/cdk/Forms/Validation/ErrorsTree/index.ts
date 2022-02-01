import { partial } from '@utils/funcs'
import { useLeaf, useArrayRoot, useRecordRoot } from '../../../ContextTree'

import { ErrorsContext } from './ErrorsTree.context'

export const useErrorsLeaf = partial(useLeaf, ErrorsContext)
export const useErrorsRecord = partial(useRecordRoot, ErrorsContext)
export const useErrorsArray = partial(useArrayRoot, ErrorsContext)
