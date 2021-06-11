import type { ReactElement } from 'react'
import MarkerLabel = google.maps.MarkerLabel
import Icon = google.maps.Icon

export type Option<T> = [OptionKey, OptionDesc, T]

export type OptionKey = string | number

interface OptionDesc {
  coords: LatLng
  description: string
  infoView: ReactElement
  label?: string | MarkerLabel
  icon?: string | object | Icon
}

export type LatLng = { lat: number; lng: number }
