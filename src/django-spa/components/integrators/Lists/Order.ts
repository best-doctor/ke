import { useCallback } from 'react'
import { makeCommonConsumer } from '@cdk/multiple-contexts'
import { PolymorphComponent } from '~types'

import { paramsContext, statusContext } from './contexts'

/**
 * Полиморфный компонент для вывода компонента управления сортировкой связанных данных
 */
export const Order: PolymorphComponent<{
  order: unknown
  onChange: (order: unknown) => void
  isLoading?: boolean
}> = makeCommonConsumer(
  {
    paramsCtx: paramsContext,
    statusCtx: statusContext,
  },
  ({ paramsCtx, statusCtx }) => {
    const [params, setParams] = paramsCtx
    const handleChange = useCallback(
      (order: unknown) => {
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
