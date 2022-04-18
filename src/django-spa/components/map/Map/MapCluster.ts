import { MapCluster as GoogleMapCluster } from './providers/GoogleMaps'
import { MapCluster as YandexMapCluster } from './providers/YandexMaps'

import { makeSwitchableMapComponent } from './makeSwitchableMapComponent'
import { LatLng, MarkerIcon, MarkerLabel, MarkerSymbol } from './types'

export interface MapClusterProps {
  icon?: MarkerIcon | MarkerSymbol | string
  label?: string | MarkerLabel
  onClick?: () => void
  center: LatLng
  title?: string
}

export const MapCluster = makeSwitchableMapComponent<MapClusterProps>({
  google: GoogleMapCluster,
  yandex: YandexMapCluster,
})
