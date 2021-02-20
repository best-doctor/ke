import * as React from 'react'
import styled from 'styled-components'
import { InfoWindow, GoogleMap, LoadScript, Marker } from '@react-google-maps/api'

import { WidgetWrapper } from '../../common/components/WidgetWrapper'

import type { GenericAccessor } from '../../typing'
import { getData } from '../utils/dataAccess'
import type { GoogleConfig } from '../../integration/google'

interface Coordinates {
  lat: number
  lng: number
}

interface MarkerInfo {
  title: string
  description: string
  coords: Coordinates
}

interface MapWidgetProps {
  name: string
  style: any
  helpText: string
  notifier: any
  googleConfig: GoogleConfig
  dataSource: GenericAccessor
  mainDetailObject: any
}

const StyledMapWidget = styled.div`
  border-width: 1px;
  border-radius: 3px;
  border-color: #cbd5e0;
  padding: 5.4px;
  white-space: pre-line;
`

const mapContainerStyle = {
  height: '400px',
  width: '800px',
}

const moscowCoords: Coordinates = {
  lat: 55.75,
  lng: 37.61,
}

const MapWidget = (props: MapWidgetProps): JSX.Element => {
  const { name, style, helpText, notifier, googleConfig, dataSource, mainDetailObject } = props
  const markers: readonly MarkerInfo[] = getData(dataSource, mainDetailObject) || []
  const center = markers.length ? markers[0].coords : moscowCoords

  const [selected, setSelected] = React.useState<MarkerInfo | undefined>(undefined)

  const onSelect = (item: MarkerInfo): void => {
    setSelected(item)
  }

  return (
    <WidgetWrapper name={name} style={style} helpText={helpText} notifier={notifier}>
      <StyledMapWidget>
        <LoadScript googleMapsApiKey={googleConfig?.apiKey || ''}>
          <GoogleMap mapContainerStyle={mapContainerStyle} zoom={12} center={center}>
            {markers.map((marker) => {
              return <Marker position={marker.coords} onClick={() => onSelect(marker)} />
            })}
            {selected?.coords && (
              <InfoWindow position={selected.coords} onCloseClick={() => setSelected(undefined)}>
                <div>
                  <h1>{selected.title}</h1>
                  <p>{selected.description}</p>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        </LoadScript>
      </StyledMapWidget>
    </WidgetWrapper>
  )
}

export { MapWidget, StyledMapWidget, MarkerInfo }
