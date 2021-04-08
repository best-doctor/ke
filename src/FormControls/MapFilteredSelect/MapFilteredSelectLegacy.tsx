import React, { Key, ReactNode, useMemo } from 'react'
import { makeProxied } from '@cdk/Layouts'

import { Filter, FiltersValue, Filters } from '../../Widgets/Filters'
import { MapSelect, MapSelectProps } from '../MapSelect'
import { WidgetWrapper } from '../../common/components/WidgetWrapper'
import { BlockM1xA1L } from '../../Layouts/BlockM1xA1L'

const moscowCoords = { lat: 55.75, lng: 37.61 }

export function MapFilteredSelectLegacy<T, K extends string>({
  value,
  onChange,
  options,
  filters,
  filtersValue,
  onFiltersValueChange,
  name,
  style,
  helpText,
  description,
}: MapFilteredSelectLegacyProps<T, K>): JSX.Element {
  const Layout = useMemo(
    () =>
      makeProxied(BlockM1xA1L, (items: (readonly [Key, ReactNode])[]) => ({
        M: (
          <MapSelect
            value={value}
            onChange={onChange}
            options={options}
            center={options.length ? options[0][1].coords : moscowCoords}
            zoom={12}
          />
        ),
        S: items,
      })),
    [value, onChange, options]
  )

  return (
    <WidgetWrapper name={name} style={style} helpText={helpText} description={description}>
      <Filters filters={filters} value={filtersValue} onChange={onFiltersValueChange} layout={Layout} />
    </WidgetWrapper>
  )
}

type MapFilteredSelectLegacyProps<T, K extends string> = Pick<MapSelectProps<T>, 'value' | 'onChange' | 'options'> & {
  filters: readonly Filter<K>[]
  filtersValue: FiltersValue<K>
  onFiltersValueChange: (v: FiltersValue<K>) => void
  name: string
  style: any
  helpText: string
  description?: string | JSX.Element
}
