import React, { ReactElement } from 'react'

import { MapMarker, Map, MapProps, LatLng, MarkerIcon } from '@components/map'

interface PointProps {
  controls?: MapProps['controls']
  containerStyle?: MapProps['containerStyle']
  icon?: MarkerIcon
  position: LatLng
  zoom?: number
}

const defaultControls = { keyboardShortcuts: false }

export const Point = ({ position, icon, zoom = 12, controls, containerStyle }: PointProps): ReactElement => (
  <Map center={position} zoom={zoom} controls={{ ...defaultControls, ...controls }} containerStyle={containerStyle}>
    {position && <MapMarker key="selectMarker" position={position} icon={icon} />}
  </Map>
)
