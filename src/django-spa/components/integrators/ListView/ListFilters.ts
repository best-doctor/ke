import { createElement } from 'react'
import { PolymorphProps } from '@cdk/types'

import { FiltersValue, useListFilters } from './Contexts'

export function ListFilters<FiltersProps extends RequiredFiltersProps>({
  as: FiltersComponent,
  ...filtersProps
}: ListFiltersProps<FiltersProps>): JSX.Element {
  const [filters, onChange] = useListFilters()

  return createElement(FiltersComponent, { ...filtersProps, value: filters, onChange } as unknown as FiltersProps)
}

type ListFiltersProps<TargetProps extends RequiredFiltersProps> = PolymorphProps<RequiredFiltersProps, TargetProps>

interface RequiredFiltersProps {
  value: FiltersValue | null
  onChange: (filters: FiltersValue) => void
}
