import React, { CSSProperties, FC, useCallback, useEffect, useMemo, useState } from 'react'
import {
  Map as YandexMap,
  FullscreenControl,
  TypeSelector,
  MapState as YandexMapState,
  ZoomControl,
} from 'react-yandex-maps'
import { useDistinctCallback } from '@cdk/Hooks'
import type ymaps from 'yandex-maps'

import {
  LatLngDict,
  LatLngBoundsDict,
  LatLngTuple,
  LatLngBoundsTuple,
  MapControls,
  SearchOptions,
  Place,
} from './types'
import {
  dictToOptions,
  latLngBoundsTupleIsEqualUndefined,
  latLngTupleIsEqualUndefined,
  numberIsEqualUndefined,
  toLatLngBoundsDict,
  toLatLngDict,
  toLatLngTuple,
  useToLatLngTuple,
} from './utils'
import { SearchControl } from './SearchControl'
import { useAddEventsCallback } from './useAddEventsCallback'

export interface MapProps {
  center?: LatLngDict
  containerStyle?: CSSProperties
  controls?: MapControls
  onBoundsChange?: (bounds: LatLngBoundsDict | undefined) => void
  onCenterChange?: (center: LatLngDict | undefined) => void
  onLoad?: () => void
  onZoomChange?: (zoom: number | undefined) => void
  zoom?: number
}

const controlsDefault: MapControls = {}
const searchDefault: SearchOptions = {}
const mapModules = ['geoObject.addon.balloon', 'geoObject.addon.hint']

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
  const [zoomState, setZoomState] = useState(zoom)
  const [centerState, setCenterState] = useState(center ? toLatLngTuple(center) : undefined)
  const [boundsState, setBoundsState] = useState<LatLngBoundsTuple>()

  const latLngTupleCenterChange = useCallback(
    (latLngTuple: LatLngTuple | undefined) => {
      onCenterChange?.(latLngTuple ? toLatLngDict(latLngTuple) : undefined)
    },
    [onCenterChange]
  )
  const distinctCenterChange = useDistinctCallback(latLngTupleCenterChange, latLngTupleIsEqualUndefined)

  const distinctZoomChange = useDistinctCallback(onZoomChange, numberIsEqualUndefined, zoom)

  const latLngBoundsTupleChange = useCallback(
    (latLngBoundsTuple: LatLngBoundsTuple | undefined) => {
      onBoundsChange?.(latLngBoundsTuple ? toLatLngBoundsDict(latLngBoundsTuple) : undefined)
    },
    [onBoundsChange]
  )
  const distinctBoundsChange = useDistinctCallback(latLngBoundsTupleChange, latLngBoundsTupleIsEqualUndefined)

  useEffect(() => {
    distinctZoomChange(zoomState)
  }, [zoomState, distinctZoomChange])

  useEffect(() => {
    distinctCenterChange(centerState)
  }, [centerState, distinctCenterChange])

  useEffect(() => {
    distinctBoundsChange(boundsState)
  }, [boundsState, distinctBoundsChange])

  const addEvents = useAddEventsCallback(
    (map: ymaps.Map) => {
      setBoundsState(map.getBounds() as [LatLngTuple, LatLngTuple])

      map.events.add('boundschange', (event) => {
        setCenterState(event.get('newCenter'))
        setZoomState(event.get('newZoom'))
        setBoundsState(event.get('newBounds'))
      })
    },
    [distinctCenterChange, distinctZoomChange, distinctBoundsChange]
  )

  const latLngTupleCenter = useToLatLngTuple(center)
  const { mapType, fullscreen, draggable } = controls
  const behaviorsDict = useMemo(
    () => ({
      drag: draggable ?? true,
      scrollZoom: true,
      dblClickZoom: true,
      multiTouch: true,
      ruler: true,
      routeEditor: false,
    }),
    [draggable]
  )
  const state: YandexMapState = useMemo(
    () => ({
      behaviors: dictToOptions(behaviorsDict),
      center: latLngTupleCenter ?? [0, 0],
      zoom: zoom ?? 12,
    }),
    [latLngTupleCenter, zoom, behaviorsDict]
  )

  const { search } = controls
  const showSearch = Boolean(search)
  const {
    placeholder: searchPlaceholder,
    inputStyle: searchStyle,
    marker: SearchMarker,
  } = typeof search === 'object' ? search : searchDefault
  const [foundPosition, setFoundPosition] = useState<LatLngDict | undefined>()
  const handlePlaceChange = useCallback(
    (place: Place | undefined) => {
      // eslint-disable-next-line no-underscore-dangle
      const coordinates = place?.geometry?._coordinates
      const latLng = coordinates ? { lat: coordinates[0], lng: coordinates[1] } : undefined
      setFoundPosition(latLng)
      onCenterChange && latLng && onCenterChange(latLng)
    },
    [onCenterChange]
  )

  return (
    /* У instanceRef некорректный тип: на самом деле там передаётся сам объект карты, а не Ref на него */
    <YandexMap
      state={state}
      style={containerStyle}
      onLoad={onLoad}
      instanceRef={addEvents as never}
      modules={mapModules}
    >
      {showSearch && (
        <SearchControl placeholder={searchPlaceholder} inputStyle={searchStyle} onPlaceChange={handlePlaceChange} />
      )}
      {fullscreen && <FullscreenControl />}
      {mapType && <TypeSelector />}
      {foundPosition && SearchMarker && <SearchMarker place={{ position: foundPosition }} />}
      <ZoomControl />
      {children}
    </YandexMap>
  )
}
