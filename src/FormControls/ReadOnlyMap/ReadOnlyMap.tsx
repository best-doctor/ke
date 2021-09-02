import React, { CSSProperties } from 'react'
import { Box } from '@chakra-ui/react'

import { MapMarker, Map } from '../../Widgets/Map'
import { Coords, MarkerIcon } from '../../Widgets/Map/types'

const moscowCoords = { lat: 55.75, lng: 37.61 }

type ReadOnlyMapProps = {
  position: Coords | null
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
        showSearch={false}
        options={{ disableDefaultUI: true, draggable: false, keyboardShortcuts: false }}
        containerStyle={mapContainerStyle}
      >
        {position && <MapMarker key="selectMarker" position={position} icon={icon} />}
      </Map>
    </Box>
  )
}
