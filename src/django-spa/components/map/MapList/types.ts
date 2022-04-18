import { MapMarkerProps, LatLng, LatLngBounds } from '../Map'

export interface MapListCluster {
  label: string
  center: LatLng
  bounds: LatLngBounds
}

export type MapListItem = Pick<MapMarkerProps, 'position' | 'label' | 'title' | 'info' | 'infoSize' | 'icon'>
