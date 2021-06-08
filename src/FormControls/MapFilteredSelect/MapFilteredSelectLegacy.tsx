import React, { useCallback, useEffect } from 'react'
import { usePartialState } from '@cdk/Hooks'
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
  mapHeigth = 448,
}: MapFilteredSelectLegacyProps<T, K>): JSX.Element {
  const [currentFiltersValue, setCurrentFiltersValue] = usePartialState({ ...filtersValue, zoom: 12, bbox: undefined })

  const onFiltersChange = useCallback((f: Record<K, unknown>) => setCurrentFiltersValue(f as any), [
    setCurrentFiltersValue,
  ])
  const onZoomChange = useCallback((zoom: number) => setCurrentFiltersValue({ zoom } as any), [setCurrentFiltersValue])
  const onBboxChange = useCallback((bbox: string | undefined) => setCurrentFiltersValue({ bbox } as any), [
    setCurrentFiltersValue,
  ])

  useEffect(() => {
    onFiltersValueChange(currentFiltersValue)
  }, [currentFiltersValue, onFiltersValueChange])

  return (
    <WidgetWrapper name={name} style={style} helpText={helpText} description={description}>
      <StyledMapFilterWidget>
        <Flex height={mapHeigth}>
          <Box flex={1}>
            <MapSelect
              value={value}
              onChange={onChange as any}
              options={options}
              clusters={clusters}
              center={center || moscowCoords}
              zoom={12}
              onZoomChanged={onZoomChange}
              onBoundsChanged={onBboxChange}
            />
          </Box>
          <Box width="300px" marginLeft="5px" height={mapHeigth} overflowY="auto">
            <Filters filters={filters} value={filtersValue} onChange={onFiltersChange} layout={ListVertical} />
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
  filtersValue: FiltersValue<K>
  onFiltersValueChange: (v: FiltersValue<K | 'zoom' | 'bbox'>) => void
  name: string
  style: any
  helpText: string
  description?: string | JSX.Element
  mapHeigth?: number
}
