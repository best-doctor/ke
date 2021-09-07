import type { ReactElement } from 'react'
import MarkerLabel = google.maps.MarkerLabel
import { MarkerIcon } from '../../Widgets/Map/types'

export type Option<T> = [OptionKey, OptionDesc, T]

export type OptionKey = string | number

interface OptionDesc {
  coords: LatLng
  description: string
  infoView: (callback: () => void) => ReactElement
  label?: string | MarkerLabel
  icon?: MarkerIcon
  secondaryAction?: ReactElement
}

export type LatLng = { lat: number; lng: number }
