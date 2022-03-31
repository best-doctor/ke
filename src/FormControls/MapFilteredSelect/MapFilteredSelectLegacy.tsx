// Это легаси
/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback, useMemo, ReactElement, Key } from 'react'
import styled from 'styled-components'
import { LayoutComponent, SlotElements } from '@cdk/Layouts'
import { MapSelect, MapSelectProps } from '@components/map'
import { omit } from '@utils/dicts'

import { Filter, FiltersValue, Filters } from '../../Widgets/Filters'
import { WidgetWrapper } from '../../common/components/WidgetWrapper'
import { ListVertical } from '../../Layouts'

import { getDefaultMapLayout } from './layouts'

const moscowCoords = { lat: 55.75, lng: 37.61 }

const StyledMapFilterWidget = styled.div`
  white-space: pre-line;
`

export function MapFilteredSelectLegacy<T, K extends string>({
  value,
  onChange,
  getKey,
  options,
  clusters,
  filters,
  filtersValue,
  onFiltersValueChange,
  name,
  style,
  helpText,
  description,
  initialCenter,
  mapLayout,
  filtersLayoutProxy,
  mapHeight = 448,
  onLoad,
  filtersLayout = ListVertical,
  ...rest
}: MapFilteredSelectLegacyProps<T, K>): JSX.Element {
  const onFiltersChange = useCallback(
    (f: Record<K, unknown>) => onFiltersValueChange({ ...filtersValue, ...f }),
    [filtersValue, onFiltersValueChange]
  )

  const onViewChange = useCallback(
    ({ zoom: z, bounds }) => onFiltersValueChange({ ...filtersValue, zoom: z, bbox: bounds }),
    [filtersValue, onFiltersValueChange]
  )

  const Layout = useMemo(() => mapLayout?.(mapHeight) || getDefaultMapLayout(mapHeight), [mapHeight, mapLayout])

  const mapChildren = useMemo(
    () => ({
      map: (
        <MapSelect
          getKey={getKey}
          value={value}
          onChange={onChange as any}
          options={options}
          clusters={clusters}
          initialCenter={initialCenter || moscowCoords}
          initialZoom={filtersValue.zoom || 12}
          onViewChange={onViewChange}
          onLoad={onLoad}
        />
      ),
      filters: (
        <Filters
          filters={filters}
          value={omit(filtersValue, ['bbox', 'zoom']) as FiltersValue<K>}
          onChange={onFiltersChange}
          layout={filtersLayout}
          layoutProxy={filtersLayoutProxy}
        />
      ),
    }),
    [
      value,
      onChange,
      getKey,
      options,
      clusters,
      initialCenter,
      onLoad,
      filters,
      filtersValue,
      onViewChange,
      onFiltersChange,
      filtersLayout,
      filtersLayoutProxy,
    ]
  )

  return (
    <WidgetWrapper name={name} style={style} helpText={helpText} description={description} {...rest}>
      <StyledMapFilterWidget>
        <Layout>{mapChildren}</Layout>
      </StyledMapFilterWidget>
    </WidgetWrapper>
  )
}

type MapFilteredSelectLegacyProps<T, K extends string> = Pick<
  MapSelectProps<T>,
  'getKey' | 'value' | 'onChange' | 'options' | 'clusters' | 'initialCenter' | 'onLoad'
> & {
  filters: readonly Filter<K>[]
  filtersValue: FiltersValue<K> & { zoom?: number; bbox?: string }
  onFiltersValueChange: (v: FiltersValue<K> & { zoom?: number; bbox?: string }) => void
  name: string
  style: any
  helpText: string
  description?: string | JSX.Element
  mapHeight?: number
  mapLayout?: (mapHeight: number) => LayoutComponent<SlotElements<'map' | 'filters'>>
  filtersLayoutProxy?: (elements: [string, ReactElement][]) => Record<string, ReactElement>
  filtersLayout?: LayoutComponent<[Key, JSX.Element][]>
}
