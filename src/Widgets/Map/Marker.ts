import { Marker as GoogleMarker } from '@react-google-maps/api'
import type { FunctionComponent } from 'react'

import type { Coords } from './types'

export const MapMarker = (GoogleMarker as unknown) as FunctionComponent<MarkerProps>

interface MarkerProps {
  position: Coords
  title?: string
  onClick?: () => void
}
