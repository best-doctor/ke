import { makeCommonConsumer } from '@cdk/multiple-contexts'

import { filtersContext } from './contexts'

export const Predefined = makeCommonConsumer({ filtersCtx: filtersContext }, ({ filtersCtx }) => ({
  value: filtersCtx[0],
  onChange: filtersCtx[1],
}))
