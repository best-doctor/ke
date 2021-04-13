import { Marker as GoogleMarker } from '@react-google-maps/api'
import type { FunctionComponent } from 'react'

import type { Coords, MarkerOptions } from './types'

export const MapMarker = (GoogleMarker as unknown) as FunctionComponent<MarkerProps>

interface MarkerProps {
  position: Coords
  title?: string
  onClick?: () => void
  options?: MarkerOptions
  draggable?: boolean
  onDragEnd?: (coordinates: { latLng: { lat: () => number; lng: () => number } }) => void
  icon?: string
  label?: string
}
