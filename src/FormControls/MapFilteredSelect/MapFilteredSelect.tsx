import * as React from 'react'

import { Filters } from '@widgets/Filters'

import { MapSelect, MapSelectProps } from '../MapSelect'

export function MapFilteredSelect<T>({ value, onChange, options, filters }: MapFilteredSelectProps<T>): JSX.Element {
  return (
    <>
      <MapSelect value={value} onChange={onChange} options={options} />
      <Filters filters={filters} />
    </>
  )
}

interface MapFilteredSelectProps<T> extends Pick<MapSelectProps<T>, 'value' | 'onChange' | 'options'> {
  filters: unknown[]
}
