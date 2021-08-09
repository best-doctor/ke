import React from 'react'
import { Box } from '@chakra-ui/react'

import { MapMarker, Map } from '../../Widgets/Map'
import { Coords } from '../../Widgets/Map/types'

const moscowCoords = { lat: 55.75, lng: 37.61 }

type ReadOnlyMapProps = {
  position: Coords | null
  mapHeight: number
}

export const ReadOnlyMap = (props: ReadOnlyMapProps): JSX.Element => {
  const { position, mapHeight } = props

  return (
    <Box height={mapHeight}>
      <Map center={position || moscowCoords} zoom={12} showSearch={false}>
        {position && <MapMarker key="selectMarker" position={position} />}
      </Map>
    </Box>
  )
}
