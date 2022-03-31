import React, { CSSProperties } from 'react'
import { Box } from '@chakra-ui/react'
import { MapMarker, Map, LatLng, MarkerIcon } from '@components/map'

const moscowCoords = { lat: 55.75, lng: 37.61 }

type ReadOnlyMapProps = {
  position: LatLng | null
  mapHeight: number
  icon?: MarkerIcon
  zoom?: number
  mapContainerStyle?: CSSProperties
}

export const ReadOnlyMap = (props: ReadOnlyMapProps): JSX.Element => {
  const { position, mapHeight, icon, zoom = 12, mapContainerStyle } = props

  return (
    <Box height={mapHeight}>
      <Map
        center={position || moscowCoords}
        zoom={zoom}
        controls={{ draggable: false, keyboardShortcuts: false }}
        containerStyle={mapContainerStyle}
      >
        {position && <MapMarker key="selectMarker" position={position} icon={icon} />}
      </Map>
    </Box>
  )
}
