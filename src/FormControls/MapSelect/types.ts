import type { ReactElement } from 'react'
import MarkerLabel = google.maps.MarkerLabel

export type Option<T> = [OptionKey, OptionDesc, T]

export type OptionKey = string | number

interface OptionDesc {
  coords: LatLng
  description: string
  infoView: ReactElement
  label?: string | MarkerLabel
}

export type LatLng = { lat: number; lng: number }
