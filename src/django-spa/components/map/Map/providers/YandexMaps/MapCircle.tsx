import React, { FC, useMemo } from 'react'
import { Circle, CircleGeometry } from 'react-yandex-maps'
import type ymaps from 'yandex-maps'

import { LatLngDict } from './types'
import { toLatLngTuple } from './utils'

export interface MapCircleProps {
  center: LatLngDict
  radius: number
  options?: {
    strokeColor?: string
    strokeOpacity?: number
    strokeWeight?: number
    fillColor?: string
    fillOpacity?: number
  }
}

export const MapCircle: FC<MapCircleProps> = ({ center, radius, options }) => {
  const geometry: CircleGeometry = useMemo(() => [toLatLngTuple(center), radius], [radius, center])
  const { strokeColor, strokeWeight, strokeOpacity, fillOpacity, fillColor } = options || {}
  const circleOptions: ymaps.ICircleOptions = useMemo(
    () => ({
      strokeColor,
      strokeOpacity,
      strokeWidth: strokeWeight,
      fillColor,
      fillOpacity,
    }),
    [strokeColor, strokeOpacity, strokeWeight, fillColor, fillOpacity]
  )
  return <Circle geometry={geometry} options={circleOptions} />
}
