import { LatLng } from '../Map'

import { MapListItem } from './types'

function latRad(lat: number): number {
  const sin = Math.sin((lat * Math.PI) / 180)
  const radX2 = Math.log((1 + sin) / (1 - sin)) / 2
  return Math.max(Math.min(radX2, Math.PI), -Math.PI) / 2
}

function zoom(mapPx: number, worldPx: number, fraction: number): number {
  return Math.floor(Math.log(mapPx / worldPx / fraction) / Math.LN2)
}

export function getBoundsZoomLevel(ne: LatLng, sw: LatLng, mapDim: { height: number; width: number }): number {
  const WORLD_DIM = { height: 256, width: 256 }
  const ZOOM_MAX = 21

  const latFraction = (latRad(ne.lat) - latRad(sw.lat)) / Math.PI

  const lngDiff = ne.lng - sw.lng
  const lngFraction = (lngDiff < 0 ? lngDiff + 360 : lngDiff) / 360

  const latZoom = zoom(mapDim.height, WORLD_DIM.height, latFraction)
  const lngZoom = zoom(mapDim.width, WORLD_DIM.width, lngFraction)

  return Math.min(latZoom, lngZoom, ZOOM_MAX)
}

function shiftCoords(initial: LatLng): LatLng {
  const shift = 0.0001

  return {
    lat: initial.lat + shift,
    lng: initial.lng + shift,
  }
}

function isEqualLatLng(a: LatLng, b: LatLng): boolean {
  return a.lat === b.lat && a.lng === b.lng
}

export function makeUniqPosition(item: MapListItem, all: MapListItem[]): LatLng {
  const itemIndex = all.indexOf(item)
  const areSameBeforeExists = all.find((i, index) => index < itemIndex && isEqualLatLng(i.position, item.position))

  return areSameBeforeExists ? shiftCoords(item.position) : item.position
}
