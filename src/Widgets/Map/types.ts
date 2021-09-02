import Icon = google.maps.Icon

export interface MapContext {
  apiKey?: string
}

export type Coords = LatLng

type LatLng = { lat: number; lng: number }

export type MarkerOptions = {
  icon?: string
}

export type MarkerIcon = string | object | Icon
