import React, { CSSProperties, FC, useCallback, useMemo, useState } from 'react'
import { GoogleMap } from '@react-google-maps/api'
import { useDistinctCallback } from '@cdk/Hooks'

import { LatLng, LatLngBounds, MapControls, Place, SearchOptions } from './types'
import { latlngBoundsUndefinedIsEqual, latlngUndefinedIsEqual } from './utils'
import { SearchControl } from './SearchControl'

export interface MapProps {
  center?: LatLng
  containerStyle?: CSSProperties
  controls?: MapControls
  onBoundsChange?: (bounds: LatLngBounds | undefined) => void
  onCenterChange?: (center: LatLng | undefined) => void
  onLoad?: () => void
  onZoomChange?: (zoom: number | undefined) => void
  zoom?: number
}

const controlsDefault: MapControls = {}
const searchDefault: SearchOptions = {
  placeholder: 'Введите адрес',
}

export const Map: FC<MapProps> = ({
  center,
  onCenterChange,
  zoom,
  onZoomChange,
  onBoundsChange,
  controls = controlsDefault,
  onLoad,
  containerStyle,
  children,
}) => {
  const distinctCenterChange = useDistinctCallback(onCenterChange, latlngUndefinedIsEqual, center)
  function handleCenterChanged(this: google.maps.Map): void {
    // eslint-disable-next-line react/no-this-in-sfc
    distinctCenterChange(this.getCenter()?.toJSON())
  }

  const distinctZoomChange = useDistinctCallback(onZoomChange, undefined, zoom)
  function handleZoomChanged(this: google.maps.Map): void {
    // eslint-disable-next-line react/no-this-in-sfc
    distinctZoomChange(this.getZoom())
  }

  const distinctBoundsChange = useDistinctCallback(onBoundsChange, latlngBoundsUndefinedIsEqual)
  function handleBoundsChanged(this: google.maps.Map): void {
    // eslint-disable-next-line react/no-this-in-sfc
    distinctBoundsChange(this.getBounds()?.toJSON())
  }

  const { search } = controls
  const showSearch = Boolean(search)
  const {
    placeholder: searchPlaceholder,
    inputStyle: searchStyle,
    marker: SearchMarker,
  } = typeof search === 'object' ? { ...searchDefault, ...search } : searchDefault
  const [foundPlace, setFoundPlace] = useState<Place | undefined>()
  const handlePlaceChange = useCallback(
    (place: Place | undefined) => {
      setFoundPlace(place)
      onCenterChange && place?.position && onCenterChange(place.position)
    },
    [onCenterChange]
  )

  const { mapType, streetView, clickableIcons, fullscreen, draggable, keyboardShortcuts } = controls
  const googleMapOptions: google.maps.MapOptions = useMemo(
    () => ({
      clickableIcons: clickableIcons ?? false,
      mapTypeControl: mapType ?? false,
      streetViewControl: streetView ?? false,
      fullscreenControl: fullscreen ?? false,
      draggable: draggable ?? true,
      keyboardShortcuts: keyboardShortcuts ?? true,
    }),
    [clickableIcons, mapType, streetView, fullscreen, draggable, keyboardShortcuts]
  )

  return (
    <>
      {showSearch && (
        <SearchControl placeholder={searchPlaceholder} inputStyle={searchStyle} onPlaceChange={handlePlaceChange} />
      )}
      <GoogleMap
        center={center}
        onCenterChanged={handleCenterChanged}
        zoom={zoom}
        onZoomChanged={handleZoomChanged}
        onBoundsChanged={handleBoundsChanged}
        onLoad={onLoad}
        mapContainerStyle={containerStyle}
        options={googleMapOptions}
      >
        {foundPlace && SearchMarker && <SearchMarker place={foundPlace} />}
        {children}
      </GoogleMap>
    </>
  )
}
