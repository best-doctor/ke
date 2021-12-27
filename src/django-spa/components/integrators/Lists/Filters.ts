import { useCallback } from 'react'
import { makeCommonConsumer } from '@cdk/multiple-contexts'

import { paramsContext, statusContext } from './contexts'
import { FiltersValue } from './types'

export const Filters = makeCommonConsumer(
  {
    paramsCtx: paramsContext,
    statusCtx: statusContext,
  },
  ({ paramsCtx, statusCtx }) => {
    const [params, setParams] = paramsCtx
    const handleChange = useCallback(
      (filters: FiltersValue) => {
        setParams({
          ...params,
          filters,
        })
      },
      [params, setParams]
    )

    return {
      onChange: handleChange,
      filters: params.filters,
      isLoading: statusCtx.isLoading,
    }
  }
)
