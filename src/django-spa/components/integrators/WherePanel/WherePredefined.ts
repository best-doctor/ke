import { createElement } from 'react'
import { PolymorphProps } from '@cdk/types'

import { FiltersValue } from './types'
import { useWhereFilters } from './WherePanel.context'

/**
 * Полиморфный компонент-обёртка для компонентов выбора набора предустановленных
 * фильтров
 */
export function WherePredefined<FiltersProps extends RequiredPredefinedProps>({
  as: Predefined,
  ...other
}: WherePredefinedProps<FiltersProps>): JSX.Element {
  const [filtersValue, onFiltersChange] = useWhereFilters()

  return createElement(Predefined, {
    ...other,
    value: filtersValue,
    onChange: onFiltersChange,
  } as unknown as FiltersProps)
}

type WherePredefinedProps<TargetProps extends RequiredPredefinedProps> = PolymorphProps<
  RequiredPredefinedProps,
  TargetProps
>

interface RequiredPredefinedProps {
  value?: FiltersValue
  onChange: (filters: FiltersValue) => void
}
