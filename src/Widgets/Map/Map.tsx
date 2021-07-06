import React, { CSSProperties, PropsWithChildren, useRef } from 'react'
import { GoogleMap, useLoadScript, StandaloneSearchBox } from '@react-google-maps/api'
import { Spinner } from '@chakra-ui/react'
import { css, Global } from '@emotion/react'

import { useMapContext } from './Map.context'
import type { Coords } from './types'
import { MapMarker } from './Marker'

const searchBoxInputStyle: CSSProperties = {
  boxSizing: 'border-box',
  border: `1px solid #cbd5e0`,
  width: `100%`,
  height: `40px`,
  padding: `0 12px`,
  marginBottom: '5.4px',
  outline: `none`,
  textOverflow: `ellipses`,
}

const mapContainerStyle: CSSProperties = {
  height: 'calc(100% - 45px)',
  width: '100%',
}

const pacCss = css`
  .pac-container {
    z-index: 1500;
  }
`

const mapLibs: 'places'[] = ['places']

export function Map({
  children,
  center,
  onZoomChanged,
  onBoundsChanged,
  zoom,
  onSearchMarkerClick,
  ...other
}: MapProps): JSX.Element {
  const mapConfig = useMapContext()
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: mapConfig?.apiKey || '',
    libraries: mapLibs,
  })
  const [searchBox, setSearchBox] = React.useState<google.maps.places.SearchBox>()
  const [searchBoxMarker, setSearchBoxMarker] = React.useState<Marker | null>(null)

  const currentCenter = React.useMemo(() => searchBoxMarker?.position || center, [center, searchBoxMarker])

  const onLoad = (ref: any): void => {
    setSearchBox(ref)
  }

  const onPlacesChanged = (): void => {
    if (searchBox !== undefined) {
      const places = searchBox.getPlaces()

      let marker: Marker | null = null
      if (places.length > 0) {
        const place = places[0]
        const { geometry } = place
        if (geometry != null) {
          const location = {
            lat: geometry.location.lat(),
            lng: geometry.location.lng(),
          }
          marker = {
            position: location,
            title: place?.name,
            label: place?.name,
          }
        }
      }
      setSearchBoxMarker(marker)
    }
  }

  const zoomRef = useRef(0)
  function handleZoomChanged(this: google.maps.Map): void {
    // eslint-disable-next-line react/no-this-in-sfc
    const changedZoom = this.getZoom()
    if (changedZoom !== zoomRef.current) {
      zoomRef.current = changedZoom
      onZoomChanged && onZoomChanged(zoomRef.current)
    }
  }

  const boundsRef = useRef<string | undefined>('')
  function handleBoundsChanged(this: google.maps.Map): void {
    let boundsStr: string | undefined
    // eslint-disable-next-line react/no-this-in-sfc
    const changedBounds = this.getBounds()
    if (changedBounds) {
      const { north, south, east, west } = changedBounds.toJSON()
      boundsStr = [south, west, north, east].join(',')
    }
    if (boundsStr !== boundsRef.current) {
      boundsRef.current = boundsStr
      onBoundsChanged && onBoundsChanged(boundsRef.current)
    }
  }

  return isLoaded ? (
    <>
      <Global styles={pacCss} />
      <StandaloneSearchBox onLoad={onLoad} onPlacesChanged={onPlacesChanged}>
        <input type="text" placeholder="Введите адрес" style={searchBoxInputStyle} />
      </StandaloneSearchBox>
      <GoogleMap
        zoom={zoom}
        onZoomChanged={handleZoomChanged}
        onBoundsChanged={handleBoundsChanged}
        {...other}
        center={currentCenter}
        mapContainerStyle={mapContainerStyle}
        clickableIcons={false}
      >
        {children}
        {searchBoxMarker && (
          <MapMarker
            key="searchBoxResult"
            title={searchBoxMarker.title}
            position={searchBoxMarker.position}
            options={{ icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png' }}
            onClick={() => onSearchMarkerClick && onSearchMarkerClick(searchBoxMarker)}
          />
        )}
      </GoogleMap>
    </>
  ) : (
    <Spinner />
  )
}

export type MapProps = PropsWithChildren<{
  center?: Coords
  zoom?: number
  onZoomChanged?: (zoom: number) => void
  onBoundsChanged?: (bounds: string | undefined) => void
  onSearchMarkerClick?: (marker: Marker) => void
}>

export type Marker = {
  position: Coords
  title?: string
  label?: string
}
