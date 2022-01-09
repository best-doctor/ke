import { useCallback } from 'react'
import { makeCommonConsumer } from '@cdk/multiple-contexts'
import { PolymorphComponent } from '~types'

import { paramsContext, statusContext } from './contexts'

/**
 * Полиморфный компонент для вывода блока фильтров для связанных данных
 */
export const Filters: PolymorphComponent<{
  filters: unknown
  onChange: (filters: unknown) => undefined
  isLoading?: boolean
}> = makeCommonConsumer(
  {
    paramsCtx: paramsContext,
    statusCtx: statusContext,
  },
  ({ paramsCtx, statusCtx }) => {
    const [params, setParams] = paramsCtx
    const handleChange = useCallback(
      (filters: unknown) => {
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
