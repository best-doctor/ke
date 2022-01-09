import { makeCommonConsumer } from '@cdk/multiple-contexts'
import { PolymorphComponent } from '~types'

import { dataContext, statusContext, selectedContext } from './contexts'

/**
 * Полиморфный компонент для вывода компонента рендера массива элементов с возможностью выбора подмассива
 */
export const SelectData: PolymorphComponent<{
  items: unknown[]
  selected?: unknown[]
  onSelectedChange?: (selected: unknown[]) => void
  isLoading?: boolean
  isNotLoaded?: boolean
}> = makeCommonConsumer(
  {
    dataCtx: dataContext,
    statusCtx: statusContext,
    selectedCtx: selectedContext,
  },
  ({ dataCtx, statusCtx, selectedCtx }) => ({
    ...statusCtx,
    items: dataCtx.items,
    selected: selectedCtx[0],
    onSelectedChange: selectedCtx[1],
  })
)
