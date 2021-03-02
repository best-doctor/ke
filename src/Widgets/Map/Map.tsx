import React, { PropsWithChildren } from 'react'
import { GoogleMap, useLoadScript } from '@react-google-maps/api'
import { Spinner } from '@chakra-ui/core'

import { useMapContext } from './Map.context'
import type { Coords } from './types'

export function Map({ children, ...other }: MapProps): JSX.Element {
  const mapConfig = useMapContext()
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: mapConfig?.apiKey || '',
  })

  return isLoaded ? (
    <GoogleMap {...other} mapContainerStyle={{ height: '100%', width: '100%' }} clickableIcons={false}>
      {children}
    </GoogleMap>
  ) : (
    <Spinner />
  )
}

export type MapProps = PropsWithChildren<{
  center?: Coords
  zoom?: number
  onCenterChanged?: () => void
  onZoomChanged?: () => void
  onBoundsChanged?: () => void
}>
