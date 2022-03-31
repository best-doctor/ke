import { MapCircle as GoogleMapCircle } from './providers/GoogleMaps'

import { LatLng } from './types'
import { makeSwitchableMapComponent } from './makeSwitchableMapComponent'

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

export const MapCircle = makeSwitchableMapComponent<MapCircleProps>({
  google: GoogleMapCircle,
})
