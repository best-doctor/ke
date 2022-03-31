import React, { FC } from 'react'
import { Marker as GoogleMarker } from '@react-google-maps/api'

import { LatLng, MarkerIcon, MarkerLabel, MarkerSymbol } from './types'
import { useGoogleIcon } from './utils'

export interface MapClusterProps {
  icon?: MarkerIcon | MarkerSymbol | string
  label?: string | MarkerLabel
  onClick?: () => void
  center: LatLng
  title?: string
}

export const MapCluster: FC<MapClusterProps> = ({
  icon = 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m1.png',
  label,
  onClick,
  title,
  center,
}) => <GoogleMarker position={center} icon={useGoogleIcon(icon)} label={label} onClick={onClick} title={title} />
