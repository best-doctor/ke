import React, { ReactElement, useCallback, useMemo, useState } from 'react'
import { makePartial } from '@cdk/compatibility'

import { Map, MapMarker, MapCluster, LatLng, MapProps, LatLngBounds } from '../Map'

import { MapListCluster, MapListItem } from './types'
import { getBoundsZoomLevel, makeUniqPosition } from './utils'
import { SearchMarker } from './SearchMarker'

export interface MapListProps<T extends MapListItem> extends Pick<MapProps, 'containerStyle' | 'onLoad'> {
  clusters?: MapListCluster[]
  getKey: (item: T) => string
  initialCenter?: LatLng
  initialOpenedKey?: string
  initialZoom?: number
  items: T[]
  onViewChange?: (view: { zoom?: number; bounds?: LatLngBounds }) => void
  searchMarkerRadius?: number
}

export const MapList = <T extends MapListItem>({
  containerStyle,
  items,
  clusters,
  initialCenter,
  initialZoom,
  initialOpenedKey,
  getKey,
  searchMarkerRadius,
  onViewChange,
  onLoad,
}: MapListProps<T>): ReactElement => {
  const [center, setCenter] = useState(initialCenter || items[0]?.position)
  const [zoom, setZoom] = useState(initialZoom)
  const [bounds, setBounds] = useState<LatLngBounds>()
  const [activeKey, setActiveKey] = useState<string | undefined>(initialOpenedKey)

  const handleItemClick = (item: T): void => setActiveKey(getKey(item))
  const handleInfoClose = (): void => setActiveKey(undefined)

  const handleClusterClick = ({ bbox, center: clusterCenter }: MapListCluster): void => {
    setZoom((prev) => {
      if (!bbox) {
        return (prev || 1) + 2
      }
      const [latSW, lngSW, latNE, lngNE] = bbox
      return getBoundsZoomLevel({ lat: latNE, lng: lngNE }, { lat: latSW, lng: lngSW }, { height: 400, width: 1000 })
    })
    setCenter(clusterCenter)
  }

  const controls = useMemo(
    () => ({
      search: {
        marker: makePartial(SearchMarker, { radius: searchMarkerRadius }),
      },
    }),
    [searchMarkerRadius]
  )

  const handleZoomChange = useCallback(
    (z: number | undefined) => {
      setZoom(z)
      onViewChange && onViewChange({ zoom: z, bounds })
    },
    [bounds, onViewChange]
  )

  const handleBoundsChange = useCallback(
    (b: LatLngBounds | undefined) => {
      setBounds(b)
      onViewChange && onViewChange({ zoom, bounds: b })
    },
    [zoom, onViewChange]
  )

  return (
    <Map
      containerStyle={containerStyle}
      center={center}
      onCenterChange={setCenter}
      zoom={zoom}
      onZoomChange={handleZoomChange}
      controls={controls}
      onBoundsChange={handleBoundsChange}
      onLoad={onLoad}
    >
      {items.map((i) => (
        /*
         * TODO: Имеет смысл отказаться от makeUniqPosition для маркеров с одинаковыми координатами
         * гораздо приличнее выглядел бы маркер кластера с всплывающим блоком со списком вложенных item в
         * том или ином виде. Типа такого - https://yandex.ru/dev/maps/jsbox/2.1/clusterer_balloon_open/
         */
        <MapMarker
          key={getKey(i)}
          position={makeUniqPosition(i, items)}
          label={i.label}
          title={i.title}
          icon={i.icon}
          info={i.info}
          onClick={() => handleItemClick(i)}
          onInfoClose={handleInfoClose}
          isInfoOpened={activeKey !== undefined && getKey(i) === activeKey}
        />
      ))}
      {clusters?.map((c) => (
        <MapCluster
          key={`${c.center.lat}-${c.center.lng}`}
          center={c.center}
          label={c.count.toString()}
          onClick={() => handleClusterClick(c)}
        />
      ))}
    </Map>
  )
}
