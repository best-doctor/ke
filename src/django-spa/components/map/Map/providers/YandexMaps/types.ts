import { ComponentType, CSSProperties } from 'react'

export interface LatLngDict {
  lat: number
  lng: number
}

export type LatLngTuple = [lat: number, lng: number]

export interface LatLngBoundsDict {
  east: number
  north: number
  south: number
  west: number
}

export type LatLngBoundsTuple = [SouthWest: LatLngTuple, NorthEast: LatLngTuple]

export interface Place {
  address?: string
  title?: string
  position?: LatLngDict
}

export interface MarkerLabel {
  className?: string
  color?: string
  fontFamily?: string
  fontSize?: string
  fontWeight?: string
  text: string
}

interface Point {
  x: number
  y: number
}

export interface MarkerIcon {
  anchor?: Point
  labelOrigin?: Point
  url: string
}

export interface MarkerSymbol {
  anchor?: Point
  fillColor?: string
  fillOpacity?: number
  labelOrigin?: Point
  path: string
  rotation?: number
  scale?: number
  strokeColor?: string
  strokeOpacity?: number
  strokeWeight?: number
}

export interface SearchOptions {
  inputStyle?: CSSProperties
  marker?: ComponentType<{ place: Place }>
  placeholder?: string
}

export interface MapControls {
  search?: boolean | SearchOptions
  fullscreen?: boolean
  clickableIcons?: boolean
  mapType?: boolean
  streetView?: boolean
  draggable?: boolean
  keyboardShortcuts?: boolean
}

export interface InfoSize {
  maxHeight?: number
  maxWidth?: number
  minHeight?: number
  minWidth?: number
}
