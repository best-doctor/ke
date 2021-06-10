import { partial } from '@utils/Funcs'
import { useLeaf, useArrayRoot, useRecordRoot } from '@cdk/ContextTree'

import { ErrorsContext } from './ErrorsTree.context'

export const useErrorsLeaf = partial(useLeaf, ErrorsContext)
export const useErrorsRecord = partial(useRecordRoot, ErrorsContext)
export const useErrorsArray = partial(useArrayRoot, ErrorsContext)
