import React from 'react'
import styled from 'styled-components'

import type { GenericAccessor } from '../../typing'
import { getData } from '../../DetailView/utils/dataAccess'
import { WidgetWrapper } from '../../common/components/WidgetWrapper'

import type { LatLng, Option } from './types'
import { MapSelect } from './MapSelect'

const StyledMapWidget = styled.div`
  border-width: 1px;
  border-radius: 3px;
  border-color: #cbd5e0;
  padding: 5.4px;
  white-space: pre-line;
  height: 400px;
`

const moscowCoords: LatLng = { lat: 55.75, lng: 37.61 }
const clusters: never[] = []

export function MapSelectLegacy<T>({
  name,
  style,
  helpText,
  description,
  notifier,
  dataSource,
  mainDetailObject,
}: MapWidgetProps): JSX.Element {
  const options: readonly Option<T>[] = getData(dataSource, mainDetailObject) || []
  const center = options.length ? options[0][1].coords : moscowCoords
  return (
    <WidgetWrapper name={name} style={style} helpText={helpText} notifier={notifier} description={description}>
      <StyledMapWidget>
        <MapSelect options={options} center={center} zoom={12} clusters={clusters} />
      </StyledMapWidget>
    </WidgetWrapper>
  )
}

interface MapWidgetProps {
  name: string
  style: any
  helpText: string
  description?: string | JSX.Element
  notifier: any
  dataSource: GenericAccessor
  mainDetailObject: any
}
