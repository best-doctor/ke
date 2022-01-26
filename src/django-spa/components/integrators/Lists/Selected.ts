import { makeCommonConsumer } from '@cdk/multiple-contexts'
import { PolymorphComponent } from '~types'

import { dataContext, statusContext, selectedContext } from './contexts'

/**
 * Полиморфный компонент для вывода компонента управления выбранным подмассивом элементов
 */
export const Selected: PolymorphComponent<{
  selected: unknown[]
  onSelectedChange?: (selected: never[]) => void
  total?: number
  isLoading?: boolean
}> = makeCommonConsumer(
  {
    dataCtx: dataContext,
    statusCtx: statusContext,
    selectedCtx: selectedContext,
  },
  ({ dataCtx, statusCtx, selectedCtx }) => ({
    selected: selectedCtx[0],
    onSelectedChange: selectedCtx[1],
    total: dataCtx.total,
    isLoading: statusCtx.isLoading,
  })
)
