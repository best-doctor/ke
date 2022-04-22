import React, { FC, ReactElement, useCallback, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { Placemark, withYMaps } from 'react-yandex-maps'
import { useDistinctCallback } from '@cdk/Hooks'
import type ymaps from 'yandex-maps'

import { InfoSize, LatLngDict, LatLngTuple, MarkerIcon, MarkerLabel, MarkerSymbol } from './types'
import { getIconColor, latLngTupleIsEqualUndefined, makeLayout, toLatLngDict } from './utils'
import { useAddEventsCallback } from './useAddEventsCallback'
import { useBalloonSize } from './useBalloonSize'

export interface MapMarkerProps {
  draggable?: boolean
  icon?: MarkerIcon | MarkerSymbol | string
  info?: ReactElement
  infoSize?: InfoSize
  isInfoOpened?: boolean
  label?: string | MarkerLabel
  onClick?: () => void
  onInfoClose?: () => void
  onPositionChange?: (position: LatLngDict | undefined) => void
  position: LatLngDict
  title?: string
}

/**
 * TODO: Добавить поддержку кастомных иконок типа MarkerIcon и MarkerSymbol
 * Пример кастомной svg картинки для Placemark - https://jsfiddle.net/n1zd306x/
 *
 * TODO: Добавить поддержку кастомных MarkerLabel
 */

export const MapMarker = withYMaps<MapMarkerProps & { ymaps: Pick<typeof ymaps, 'templateLayoutFactory'> }>(
  ({
    position,
    draggable,
    info,
    infoSize,
    isInfoOpened,
    onInfoClose,
    onClick,
    onPositionChange,
    label,
    title,
    ymaps: { templateLayoutFactory },
    icon,
  }) => {
    const [balloonNode, setBalloonNode] = useState<HTMLElement>()

    const balloonSize = useBalloonSize(balloonNode, infoSize)
    const balloonContentLayout = useMemo(
      () => makeLayout(templateLayoutFactory, setBalloonNode),
      [templateLayoutFactory]
    )

    const fillColor = getIconColor(icon)

    const { lat, lng } = position
    const geometry: LatLngTuple = useMemo(() => [lat, lng], [lat, lng])
    const options: ymaps.IPlacemarkOptions = useMemo(
      () => ({
        preset: 'islands#dotIcon',
        draggable,
        balloonContentLayout,
        hasBalloon: !!info,
        iconColor: fillColor,
        ...balloonSize,
      }),
      [draggable, balloonContentLayout, info, balloonSize, fillColor]
    )
    const properties = useMemo(
      () => ({
        iconCaption: typeof label === 'object' ? label.text : label,
        hintContent: title,
      }),
      [label, title]
    )

    const latLngTuplePositionChange = useCallback(
      (latLngTuple: LatLngTuple | undefined) => {
        onPositionChange?.(latLngTuple ? toLatLngDict(latLngTuple) : undefined)
      },
      [onPositionChange]
    )
    const distinctPositionChange = useDistinctCallback(latLngTuplePositionChange, latLngTupleIsEqualUndefined)

    const addEvents = useAddEventsCallback(
      (placemark: ymaps.Placemark) => {
        if (isInfoOpened && !placemark.balloon.isOpen()) {
          placemark.balloon.open()
        }

        placemark.events.add('balloonclose', () => {
          onInfoClose?.()
        })
        placemark.events.add('geometrychange', () => {
          distinctPositionChange((placemark.geometry?.getCoordinates() as LatLngTuple) || undefined)
        })
        placemark.events.add('click', () => {
          onClick?.()
        })
      },
      [isInfoOpened, distinctPositionChange, onClick, onInfoClose]
    )

    const balloonPortal = useMemo(
      () => (balloonNode ? createPortal(info, balloonNode) : undefined),
      [info, balloonNode]
    )

    return (
      <>
        <Placemark geometry={geometry} options={options} properties={properties} instanceRef={addEvents} />
        {balloonPortal}
      </>
    )
  },
  true,
  ['templateLayoutFactory']
) as FC<MapMarkerProps>
