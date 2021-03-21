import * as React from 'react'
import styled from 'styled-components'
import { Flex, Box } from '@chakra-ui/core'
import { VerticalList } from '@cdk/Layouts'

import { Filters, FiltersProps } from '../../Widgets/Filters'

import { MapSelect, MapSelectProps } from '../MapSelect'
import { WidgetWrapper } from '../../common/components/WidgetWrapper'

const StyledMapFilterWidget = styled.div`
  border-width: 1px;
  border-radius: 0.25rem;
  border-color: #cbd5e0;
  padding: 5.4px;
  white-space: pre-line;
`

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
}: MapFilteredSelectLegacyProps<T, K>): JSX.Element {
  return (
    <WidgetWrapper name={name} style={style} helpText={helpText}>
      <StyledMapFilterWidget>
        <Flex height="448px">
          <Box flex={1}>
            <MapSelect
              value={value}
              onChange={onChange}
              options={options}
              center={options.length ? options[0][1].coords : moscowCoords}
              zoom={12}
            />
          </Box>
          <Box width="300px" marginLeft="5px">
            <Filters filters={filters} value={filtersValue} onChange={onFiltersValueChange} layout={VerticalList} />
          </Box>
        </Flex>
      </StyledMapFilterWidget>
    </WidgetWrapper>
  )
}

type MapFilteredSelectLegacyProps<T, K extends string> = Pick<MapSelectProps<T>, 'value' | 'onChange' | 'options'> &
  Pick<FiltersProps<K>, 'filters'> & {
    filtersValue: FiltersProps<K>['value']
    onFiltersValueChange: FiltersProps<K>['onChange']
    name: string
    style: any
    helpText: string
  }
