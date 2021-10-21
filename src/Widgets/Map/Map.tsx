import React, { CSSProperties, PropsWithChildren, useMemo, useRef, useState } from 'react'
import { GoogleMap, useLoadScript, StandaloneSearchBox, Circle } from '@react-google-maps/api'
import { Input, Spinner, styled } from '@chakra-ui/react'
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

const getMapContainerStyle = (showSearch: boolean): CSSProperties => ({
  height: `calc(100% - ${showSearch ? 45 : 0}px)`,
  width: '100%',
})

const pacCss = css`
  .pac-container {
    z-index: calc(var(--chakra-zIndices-modal) + 100);
  }
`

const mapLibs: 'places'[] = ['places']

const circleOptions = {
  strokeColor: '#002aff',
  strokeOpacity: 0.6,
  strokeWeight: 2,
  fillColor: '#0748ee',
  fillOpacity: 0.25,
}

const StyledAddressInput = styled(Input, {
  baseStyle: {
    boxShadow: `0px 2px 7px rgba(0, 0, 0, 0.15)`,
    pos: 'absolute',
    left: '10px',
    top: '10px',
    width: 'calc(100% - 10px - 82px)',
    backgroundColor: 'white',
    zIndex: '1',
  },
})

export function Map({
  children,
  center,
  onZoomChanged,
  onBoundsChanged,
  zoom,
  onSearchMarkerClick,
  searchMarkerRadius,
  showSearch = true,
  containerStyle = {},
  searchStyle,
  ...other
}: MapProps): JSX.Element {
  const mapConfig = useMapContext()
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: mapConfig?.apiKey || '',
    libraries: mapLibs,
  })
  const [searchBox, setSearchBox] = useState<google.maps.places.SearchBox>()
  const [searchBoxMarker, setSearchBoxMarker] = useState<Marker | null>(null)

  const currentCenter = useMemo(() => searchBoxMarker?.position || center, [center, searchBoxMarker])
  const mapContainerStyle = useMemo(
    () => ({ ...getMapContainerStyle(showSearch && searchStyle === 'default'), ...containerStyle }),
    [containerStyle, searchStyle, showSearch]
  )

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

  const AddressSearchComponent = searchStyle === 'absolute' ? StyledAddressInput : 'input'

  return isLoaded ? (
    <>
      <Global styles={pacCss} />
      {showSearch && (
        <StandaloneSearchBox onLoad={onLoad} onPlacesChanged={onPlacesChanged}>
          <AddressSearchComponent
            type="text"
            placeholder="Введите адрес"
            style={searchStyle !== 'absolute' ? searchBoxInputStyle : undefined}
          />
        </StandaloneSearchBox>
      )}
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
          <>
            <MapMarker
              key="searchBoxResult"
              title={searchBoxMarker.title}
              position={searchBoxMarker.position}
              options={{ icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png' }}
              onClick={() => onSearchMarkerClick && onSearchMarkerClick(searchBoxMarker)}
            />
            {searchMarkerRadius && (
              <Circle center={searchBoxMarker.position} options={circleOptions} radius={searchMarkerRadius} />
            )}
          </>
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
  searchMarkerRadius?: number
  showSearch?: boolean
  searchStyle?: 'default' | 'absolute'
  containerStyle?: CSSProperties
  options?: google.maps.MapOptions
  onLoad?: (map: google.maps.Map) => void | Promise<void>
}>

export type Marker = {
  position: Coords
  title?: string
  label?: string
}
