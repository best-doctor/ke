import { useMemo } from 'react'

import { GooglePoint } from './GooglePoint'
import { LatLng, LatLngBounds, MarkerIcon, MarkerSymbol } from './types'

export function latlngIsEqual(a: LatLng, b: LatLng): boolean {
  return a.lat === b.lat && a.lng === b.lng
}

export function latlngBoundsIsEqual(a: LatLngBounds, b: LatLngBounds): boolean {
  return a.north === b.north && a.east === b.east && a.south === b.south && a.west === b.west
}

export function addUndefinedToIsEqual<T>(
  isEqual: (a: T, b: T) => boolean
): (a: T | undefined, b: T | undefined) => boolean {
  return (a, b) => (a === undefined || b === undefined ? a === b : isEqual(a, b))
}

export const latlngUndefinedIsEqual = addUndefinedToIsEqual(latlngIsEqual)

export const latlngBoundsUndefinedIsEqual = addUndefinedToIsEqual(latlngBoundsIsEqual)

export function useGoogleIcon(
  icon: string | MarkerIcon | MarkerSymbol | undefined
): string | undefined | google.maps.Icon | google.maps.Symbol {
  return useMemo(() => {
    let googleIcon: string | undefined | google.maps.Icon | google.maps.Symbol

    if (typeof icon === 'string' || typeof icon === 'undefined') {
      googleIcon = icon
    } else {
      const { anchor, labelOrigin, ...restIcon } = icon
      googleIcon = {
        ...restIcon,
        anchor: anchor ? new GooglePoint(anchor.x, anchor.y) : undefined,
        labelOrigin: labelOrigin ? new GooglePoint(labelOrigin.x, labelOrigin.y) : undefined,
      }
    }

    return googleIcon
  }, [icon])
}
