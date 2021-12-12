import { createElement } from 'react'
import { PolymorphProps } from '@cdk/types'

import { FiltersValue, useSelectFilters } from './Contexts'

export function SelectWhere<FiltersProps extends RequiredFiltersProps>({
  as: FiltersComponent,
  ...filtersProps
}: SelectFiltersProps<FiltersProps>): JSX.Element {
  const [filters, onChange] = useSelectFilters()

  return createElement(FiltersComponent, { ...filtersProps, value: filters, onChange } as unknown as FiltersProps)
}

type SelectFiltersProps<TargetProps extends RequiredFiltersProps> = PolymorphProps<RequiredFiltersProps, TargetProps>

interface RequiredFiltersProps {
  value: FiltersValue | null
  onChange: (filters: FiltersValue) => void
}
