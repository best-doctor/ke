import type { ReactElement } from 'react'

export type Option<T> = [OptionKey, OptionLabel, T]

export type OptionKey = string | number

interface OptionLabel {
  coords: LatLng
  description: string
  infoView: ReactElement
}

type LatLng = [number, number]
