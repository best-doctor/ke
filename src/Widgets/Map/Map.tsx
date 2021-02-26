import React, { PropsWithChildren } from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api'

import { useMapContext } from './Map.context'
import type { Coords } from './types'

export function Map({ children, ...other }: MapProps): JSX.Element {
  const mapConfig = useMapContext()

  return (
    <LoadScript googleMapsApiKey={mapConfig?.apiKey || ''}>
      <GoogleMap {...other} mapContainerStyle={{ height: '100%', width: '100%' }}>
        {children}
      </GoogleMap>
    </LoadScript>
  )
}

export type MapProps = PropsWithChildren<{
  center?: Coords
  zoom?: number
  onCenterChanged?: () => void
  onZoomChanged?: () => void
  onBoundsChanged?: () => void
}>
