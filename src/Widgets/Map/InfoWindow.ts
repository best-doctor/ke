import { InfoWindow as GoogleInfoWindow } from '@react-google-maps/api'
import type { FunctionComponent, PropsWithChildren } from 'react'

import type { Coords } from './types'

export const MapInfoWindow = GoogleInfoWindow as unknown as FunctionComponent<InfoWindowProps>

type InfoWindowProps = PropsWithChildren<{
  onCloseClick?: () => void
  position: Coords
  options?: google.maps.InfoWindowOptions
}>
