import React, { FC } from 'react'
import { Circle } from '@react-google-maps/api'

import { LatLng } from './types'

export interface MapCircleProps {
  center: LatLng
  radius: number
  options?: {
    strokeColor?: string
    strokeOpacity?: number
    strokeWeight?: number
    fillColor?: string
    fillOpacity?: number
  }
}

export const MapCircle: FC<MapCircleProps> = ({ center, radius, options }) => (
  <Circle center={center} radius={radius} options={options} />
)
