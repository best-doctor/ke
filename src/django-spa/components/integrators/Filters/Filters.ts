import { makeCommonConsumer } from '@cdk/multiple-contexts'

import { filtersContext } from './contexts'

export const Filters = makeCommonConsumer({ filtersCtx: filtersContext }, ({ filtersCtx }) => ({
  filters: filtersCtx[0],
  onChange: filtersCtx[1],
}))
