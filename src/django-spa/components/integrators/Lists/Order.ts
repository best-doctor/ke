import { useCallback } from 'react'
import { makeCommonConsumer } from '@cdk/multiple-contexts'

import { paramsContext, statusContext } from './contexts'
import { OrderValue } from './types'

export const Order = makeCommonConsumer(
  {
    paramsCtx: paramsContext,
    statusCtx: statusContext,
  },
  ({ paramsCtx, statusCtx }) => {
    const [params, setParams] = paramsCtx
    const handleChange = useCallback(
      (order: OrderValue) => {
        setParams({
          ...params,
          order,
        })
      },
      [params, setParams]
    )

    return {
      onChange: handleChange,
      order: params.order,
      isLoading: statusCtx.isLoading,
    }
  }
)
