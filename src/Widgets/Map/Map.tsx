import * as React from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api'
import type { PropsWithChildren } from 'react'

import { useMapContext } from './Map.context'
import type { Coords } from './types'

export function Map({ children, ...other }: MapProps): JSX.Element {
  const mapConfig = useMapContext()

  return (
    <LoadScript googleMapsApiKey={mapConfig?.apiKey || ''}>
      <GoogleMap {...other}>{children}</GoogleMap>
    </LoadScript>
  )
}

export type MapProps = PropsWithChildren<{
  center?: Coords
  zoom?: number
  onCenterChanged?: () => void
  onZoomChanged?: () => void
}>
