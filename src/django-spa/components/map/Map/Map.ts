import { CSSProperties } from 'react'

import { Map as GoogleMap } from './providers/GoogleMaps'
import { LatLng, LatLngBounds, MapControls } from './types'
import { makeSwitchableMapComponent } from './makeSwitchableMapComponent'

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

export const Map = makeSwitchableMapComponent<MapProps>({
  google: GoogleMap,
})
