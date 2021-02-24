import * as React from 'react'
import { Box } from '@chakra-ui/core'

import { Filters, FiltersProps } from '@widgets/Filters'

import { MapSelect, MapSelectProps } from '../MapSelect'

export function MapFilteredSelect<T, K extends string>({
  value,
  onChange,
  options,
  filters,
  filtersValue,
  onFiltersValueChange,
}: MapFilteredSelectProps<T, K>): JSX.Element {
  return (
    <Box>
      <MapSelect value={value} onChange={onChange} options={options} />
      <Filters filters={filters} value={filtersValue} onChange={onFiltersValueChange} />
    </Box>
  )
}

type MapFilteredSelectProps<T, K extends string> = Pick<MapSelectProps<T>, 'value' | 'onChange' | 'options'> &
  Pick<FiltersProps<K>, 'filters'> & {
    filtersValue: FiltersProps<K>['value']
    onFiltersValueChange: FiltersProps<K>['onChange']
  }
