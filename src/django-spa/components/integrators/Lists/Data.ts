import { makeCommonConsumer } from '@cdk/multiple-contexts'
import { PolymorphComponent } from '~types'

import { dataContext, statusContext } from './contexts'

/**
 * Полиморфный компонент для вывода компонента рендера массива элементов
 */
export const Data: PolymorphComponent<{ items: unknown[]; isLoading?: boolean; isNotLoaded?: boolean }> =
  makeCommonConsumer(
    {
      dataCtx: dataContext,
      statusCtx: statusContext,
    },
    ({ dataCtx, statusCtx }) => ({
      ...statusCtx,
      items: dataCtx.items,
    })
  )
