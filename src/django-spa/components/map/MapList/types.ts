import { MapMarkerProps, LatLng } from '../Map'

export interface MapListCluster {
  count: number
  center: LatLng
  bbox?: [latSW: number, lngSW: number, latNE: number, lngNe: number]
}

export type MapListItem = Pick<MapMarkerProps, 'position' | 'label' | 'title' | 'info' | 'icon'>
