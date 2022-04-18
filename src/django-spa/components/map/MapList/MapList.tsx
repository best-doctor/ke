import React, { ReactElement, useCallback, useMemo, useState } from 'react'
import { makePartial } from '@cdk/compatibility'

import { Map, MapMarker, MapCluster, LatLng, MapProps, LatLngBounds, ViewParams } from '../Map'

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
  onViewChange?: (view: Partial<ViewParams>) => void
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

  const handleClusterClick = ({ bounds: clusterBounds, center: clusterCenter }: MapListCluster): void => {
    setZoom((prev) => {
      if (!clusterBounds) {
        return (prev || 1) + 2
      }
      const { south, east, west, north } = clusterBounds
      const calcZoom = getBoundsZoomLevel(
        { lat: north, lng: east },
        { lat: south, lng: west },
        { height: 400, width: 1000 }
      )
      return Math.max((prev || 0) + 1, calcZoom)
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
      onViewChange?.({ zoom: z, bounds })
    },
    [bounds, onViewChange]
  )

  const handleBoundsChange = useCallback(
    (b: LatLngBounds | undefined) => {
      setBounds(b)
      onViewChange?.({ zoom, bounds: b })
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
          infoSize={i.infoSize}
          onClick={() => handleItemClick(i)}
          onInfoClose={handleInfoClose}
          isInfoOpened={activeKey !== undefined && getKey(i) === activeKey}
        />
      ))}
      {clusters?.map((c) => (
        <MapCluster
          key={`${c.center.lat}-${c.center.lng}`}
          center={c.center}
          label={c.label}
          onClick={() => handleClusterClick(c)}
        />
      ))}
    </Map>
  )
}
