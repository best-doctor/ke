import React from 'react'

import { MapMarker, Map, MapProps } from '../../Widgets/Map'
import { Coords, MarkerIcon } from '../../Widgets/Map/types'

interface PointProps extends Pick<MapProps, 'containerStyle' | 'zoom' | 'options'> {
  position: Coords
  icon?: MarkerIcon
  zoom?: number
}

const defaultOptions = { keyboardShortcuts: false }

export const Point = ({ position, icon, zoom = 12, options, ...rest }: PointProps): JSX.Element => (
  // Это обёртка
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Map center={position} zoom={zoom} showSearch={false} options={{ ...defaultOptions, ...options }} {...rest}>
    {position && <MapMarker key="selectMarker" position={position} icon={icon} />}
  </Map>
)
