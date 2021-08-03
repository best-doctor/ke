import React, { useCallback } from 'react'
import styled from 'styled-components'
import { Box, Flex } from '@chakra-ui/react'

import { Filter, FiltersValue, Filters } from '../../Widgets/Filters'
import { MapSelect, MapSelectProps } from '../MapSelect'
import { WidgetWrapper } from '../../common/components/WidgetWrapper'
import { ListVertical } from '../../Layouts'

const moscowCoords = { lat: 55.75, lng: 37.61 }

const StyledMapFilterWidget = styled.div`
  border-width: 1px;
  border-radius: 3px;
  border-color: #cbd5e0;
  padding: 5.4px;
  white-space: pre-line;
`

export function MapFilteredSelectLegacy<T, K extends string>({
  value,
  onChange,
  options,
  clusters,
  filters,
  filtersValue,
  onFiltersValueChange,
  name,
  style,
  helpText,
  description,
  center,
  mapHeight = 448,
}: MapFilteredSelectLegacyProps<T, K>): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { bbox, zoom, ...otherFilters } = filtersValue
  const onFiltersChange = useCallback((f: Record<K, unknown>) => onFiltersValueChange({ ...filtersValue, ...f }), [
    filtersValue,
    onFiltersValueChange,
  ])
  const onZoomChange = useCallback((z: number) => onFiltersValueChange({ ...filtersValue, zoom: z }), [
    filtersValue,
    onFiltersValueChange,
  ])
  const onBboxChange = useCallback((b: string | undefined) => onFiltersValueChange({ ...filtersValue, bbox: b }), [
    filtersValue,
    onFiltersValueChange,
  ])

  return (
    <WidgetWrapper name={name} style={style} helpText={helpText} description={description}>
      <StyledMapFilterWidget>
        <Flex height={mapHeight}>
          <Box flex={1}>
            <MapSelect
              value={value}
              onChange={onChange as any}
              options={options}
              clusters={clusters}
              center={center || moscowCoords}
              zoom={zoom || 12}
              onZoomChanged={onZoomChange}
              onBoundsChanged={onBboxChange}
            />
          </Box>
          <Box width="300px" marginLeft="5px" height={mapHeight} overflowY="auto">
            <Filters
              filters={filters}
              value={otherFilters as FiltersValue<K>}
              onChange={onFiltersChange}
              layout={ListVertical}
            />
          </Box>
        </Flex>
      </StyledMapFilterWidget>
    </WidgetWrapper>
  )
}

type MapFilteredSelectLegacyProps<T, K extends string> = Pick<
  MapSelectProps<T>,
  'value' | 'onChange' | 'options' | 'clusters' | 'center'
> & {
  filters: readonly Filter<K>[]
  filtersValue: FiltersValue<K> & { zoom?: number; bbox?: string }
  onFiltersValueChange: (v: FiltersValue<K> & { zoom?: number; bbox?: string }) => void
  name: string
  style: any
  helpText: string
  description?: string | JSX.Element
  mapHeight?: number
}
