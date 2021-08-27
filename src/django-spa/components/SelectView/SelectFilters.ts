import { createElement } from 'react'
import { PolymorphProps } from '@cdk/Types'

import { Filters, useSelectFilters } from './Contexts'

export function SelectFilters<FiltersProps extends RequiredFiltersProps>({
  as: FiltersComponent,
  ...filtersProps
}: SelectFiltersProps<FiltersProps>): JSX.Element {
  const [filters, onChange] = useSelectFilters()

  return createElement(FiltersComponent, ({ ...filtersProps, value: filters, onChange } as unknown) as FiltersProps)
}

type SelectFiltersProps<TargetProps extends RequiredFiltersProps> = PolymorphProps<RequiredFiltersProps, TargetProps>

interface RequiredFiltersProps {
  value: Filters | null
  onChange: (filters: Filters) => void
}
