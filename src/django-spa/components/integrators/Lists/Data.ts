import { makeCommonConsumer } from '@cdk/multiple-contexts'

import { dataContext, statusContext } from './contexts'

export const Data = makeCommonConsumer(
  {
    dataCtx: dataContext,
    statusCtx: statusContext,
  },
  ({ dataCtx, statusCtx }) => {
    return {
      ...statusCtx,
      items: dataCtx.items,
    }
  }
)
