import { ReactElement } from 'react'

import { MapMarker as GoogleMapMarker } from './providers/GoogleMaps'
import { MapMarker as YandexMapMarker } from './providers/YandexMaps'

import { LatLng, MarkerSymbol, MarkerIcon, MarkerLabel, InfoSize } from './types'
import { makeSwitchableMapComponent } from './makeSwitchableMapComponent'

export interface MapMarkerProps {
  draggable?: boolean
  icon?: MarkerIcon | MarkerSymbol | string
  info?: ReactElement
  infoSize?: InfoSize
  isInfoOpened?: boolean
  label?: string | MarkerLabel
  onClick?: () => void
  onInfoClose?: () => void
  onPositionChange?: (position: LatLng | undefined) => void
  position: LatLng
  title?: string
}

export const MapMarker = makeSwitchableMapComponent<MapMarkerProps>({
  google: GoogleMapMarker,
  yandex: YandexMapMarker,
})
