import { useMemo } from 'react'
import type ymaps from 'yandex-maps'

import { LatLngBoundsDict, LatLngBoundsTuple, LatLngDict, LatLngTuple, MarkerIcon, MarkerSymbol } from './types'

export function toLatLngTuple({ lat, lng }: LatLngDict): LatLngTuple {
  return [lat, lng]
}

export function toLatLngDict([lat, lng]: LatLngTuple): LatLngDict {
  return { lat, lng }
}

export function useToLatLngTuple(latLngDict: LatLngDict | undefined): LatLngTuple | undefined {
  return useMemo(() => (latLngDict ? toLatLngTuple(latLngDict) : undefined), [latLngDict])
}

export function toLatLngBoundsDict([[south, west], [north, east]]: LatLngBoundsTuple): LatLngBoundsDict {
  return { south, west, east, north }
}

export function latLngTupleIsEqual(a: LatLngTuple, b: LatLngTuple): boolean {
  return a[0] === b[0] && a[1] === b[1]
}

export function latLngBoundsTupleIsEqual(a: LatLngBoundsTuple, b: LatLngBoundsTuple): boolean {
  return latLngTupleIsEqual(a[0], b[0]) && latLngTupleIsEqual(a[1], b[1])
}

export function addUndefinedToIsEqual<T>(
  isEqual: (a: T, b: T) => boolean
): (a: T | undefined, b: T | undefined) => boolean {
  return (a, b) => (a === undefined || b === undefined ? a === b : isEqual(a, b))
}

export const latLngTupleIsEqualUndefined = addUndefinedToIsEqual(latLngTupleIsEqual)

export const latLngBoundsTupleIsEqualUndefined = addUndefinedToIsEqual(latLngBoundsTupleIsEqual)

export const numberIsEqualUndefined = addUndefinedToIsEqual((a: number, b: number) => a === b)

export function dictToOptions(dict: Record<string, boolean>): string[] {
  return Object.entries(dict)
    .filter(([_, enabled]) => enabled)
    .map(([key]) => key)
}

export function makeLayout(
  layoutFactory: typeof ymaps.templateLayoutFactory,
  setNode: (node: HTMLElement) => void
): ReturnType<typeof ymaps.templateLayoutFactory.createClass> {
  const Layout = layoutFactory.createClass('<div></div>', {
    build(this: ymaps.layout.templateBased.Base) {
      ;(Layout as unknown as { superclass: ymaps.layout.templateBased.Base }).superclass.build.call(this)
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      setNode(this.getParentElement().querySelector('div')!)
    },
  })

  return Layout
}

export function getIconColor(icon?: MarkerIcon | MarkerSymbol | string): string | undefined {
  return icon && typeof icon !== 'string' && 'fillColor' in icon ? icon?.fillColor : undefined
}
