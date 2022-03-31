import React, { CSSProperties, FC, useMemo } from 'react'
import { Map as YandexMap, MapState as YandexMapState } from 'react-yandex-maps'

import { LatLng, LatLngBounds, MapControls, SearchOptions } from './types'
import { useLngLat } from '@components/map/Map/providers/YandexMaps/utils'
import { z } from 'zod'

export interface MapProps {
  center?: LatLng
  containerStyle?: CSSProperties
  controls?: MapControls
  onBoundsChange?: (bounds: LatLngBounds | undefined) => void
  onCenterChange?: (center: LatLng | undefined) => void
  onLoad?: () => void
  onZoomChange?: (zoom: number | undefined) => void
  zoom?: number
}

const controlsDefault: MapControls = {}
const searchDefault: SearchOptions = {}

export const Map: FC<MapProps> = ({
  center,
  onCenterChange,
  zoom,
  onZoomChange,
  onBoundsChange,
  controls = controlsDefault,
  onLoad,
  containerStyle,
  children,
}) => {
  const lngLatCenter = useLngLat(center)

  const state: YandexMapState = useMemo(
    () => ({
      center: lngLatCenter ?? [0, 0],
      zoom: zoom ?? 12,
    }),
    [lngLatCenter, zoom]
  )

  return (
    <YandexMap state={state} style={containerStyle} onLoad={onLoad}>
      {children}
    </YandexMap>
  )
}
