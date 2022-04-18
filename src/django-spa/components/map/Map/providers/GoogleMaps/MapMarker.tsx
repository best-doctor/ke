import React, { FC, ReactElement, useCallback, useMemo } from 'react'
import { Marker as GoogleMarker, InfoWindow as GoogleInfoWindow } from '@react-google-maps/api'
import { useDistinctCallback } from '@cdk/Hooks'

import { LatLng, MarkerLabel, MarkerIcon, MarkerSymbol, InfoSize } from './types'
import { latlngUndefinedIsEqual, useGoogleIcon } from './utils'

export interface MapMarkerProps {
  draggable?: boolean
  icon?: MarkerIcon | MarkerSymbol | string
  info?: ReactElement
  infoSize?: InfoSize
  isInfoOpened?: boolean
  label?: string | MarkerLabel
  onClick?: () => void
  onInfoClose?: () => void
  onPositionChange?: (position: LatLng | undefined) => void
  position: LatLng
  title?: string
}

const defaultInfoSize = { maxWidth: 784 }

export const MapMarker: FC<MapMarkerProps> = ({
  position,
  icon,
  draggable,
  onPositionChange,
  label,
  onClick,
  title,
  info,
  infoSize,
  isInfoOpened,
  onInfoClose,
}) => {
  const handleClick = useCallback(() => onClick && onClick(), [onClick])

  const distinctPositionChange = useDistinctCallback(onPositionChange, latlngUndefinedIsEqual)
  function handlePositionChanged(this: google.maps.Marker): void {
    // eslint-disable-next-line react/no-this-in-sfc
    distinctPositionChange(this.getPosition()?.toJSON())
  }

  const mergedInfoSize = useMemo(() => ({ ...defaultInfoSize, ...infoSize }), [infoSize])

  return (
    <>
      <GoogleMarker
        title={title}
        label={label}
        position={position}
        icon={useGoogleIcon(icon)}
        onClick={handleClick}
        draggable={draggable}
        onPositionChanged={handlePositionChanged}
      />
      {isInfoOpened && (
        <GoogleInfoWindow position={position} onCloseClick={onInfoClose} options={mergedInfoSize}>
          {info}
        </GoogleInfoWindow>
      )}
    </>
  )
}
