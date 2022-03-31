import { useMemo } from 'react'

import { LatLng, LngLat } from './types'

export function toLngLat({ lat, lng }: LatLng): LngLat {
  return [lng, lat]
}

export function useLngLat(latLng: LatLng | undefined): LngLat | undefined {
  return useMemo(() => (latLng ? toLngLat(latLng) : undefined), [latLng])
}
