import { createElement } from 'react'
import { PolymorphProps } from '@cdk/types'

import { FiltersValue } from './types'
import { useWhereFilters } from './WherePanel.context'

/**
 * Полиморфный компонент-обёртка для компонентов с контролами фильтров
 */
export function WhereFilters<FiltersProps extends RequiredFiltersProps>({
  as: Filters,
  ...other
}: WhereFiltersProps<FiltersProps>): JSX.Element {
  const [filtersValue, onFiltersChange] = useWhereFilters()

  return createElement(Filters, {
    ...other,
    value: filtersValue,
    onChange: onFiltersChange,
  } as unknown as FiltersProps)
}

type WhereFiltersProps<TargetProps extends RequiredFiltersProps> = PolymorphProps<RequiredFiltersProps, TargetProps>

interface RequiredFiltersProps {
  /** Значение фильтров */
  value?: FiltersValue
  /** Коллбэк на изменение фильтров */
  onChange: (filters: FiltersValue) => void
}
