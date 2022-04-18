import React, { FC, useMemo } from 'react'
import { Placemark, withYMaps } from 'react-yandex-maps'
import type ymaps from 'yandex-maps'

import { LatLngDict, LatLngTuple, MarkerIcon, MarkerLabel, MarkerSymbol } from './types'
import { useAddEventsCallback } from './useAddEventsCallback'

export interface MapClusterProps {
  icon?: MarkerIcon | MarkerSymbol | string
  label?: string | MarkerLabel
  onClick?: () => void
  center: LatLngDict
  title?: string
}

const defaultOptions: ymaps.IPlacemarkOptions = {
  draggable: false,
  hasBalloon: false,
  iconLayout: 'default#imageWithContent',
  iconImageHref: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m1.png',
  iconImageSize: [52, 52],
  iconImageOffset: [-26, -26],
  iconContentOffset: [16, 19],
  iconShape: {
    type: 'Circle',
    coordinates: [0, 0],
    radius: 20,
  } as ymaps.IGeometryJson,
}

/**
 * TODO: реализовать поддержку кастомных иконок
 * TODO: реализовать поддержку MarkerLabel
 */

export const MapCluster = withYMaps<MapClusterProps & { ymaps: Pick<typeof ymaps, 'templateLayoutFactory'> }>(
  ({ label, center, title, onClick, ymaps: { templateLayoutFactory } }) => {
    const options: ymaps.IPlacemarkOptions = useMemo(() => {
      const iconLayout = templateLayoutFactory.createClass(
        '<div style="color: #ffffff; font-weight: bold; text-align: center; width: 20px">$[properties.iconContent]</div>'
      )
      return {
        ...defaultOptions,
        iconContentLayout: iconLayout,
      }
    }, [templateLayoutFactory])

    const properties = useMemo(
      () => ({
        iconContent: typeof label === 'object' ? label.text : label,
        hintContent: title,
      }),
      [label, title]
    )

    const { lat, lng } = center
    const geometry: LatLngTuple = useMemo(() => [lat, lng], [lat, lng])

    const addEvents = useAddEventsCallback(
      (placemark: ymaps.Placemark) => {
        placemark.events.add('click', () => {
          onClick?.()
        })
      },
      [onClick]
    )

    return <Placemark properties={properties} geometry={geometry} options={options} instanceRef={addEvents} />
  },
  true,
  ['templateLayoutFactory', 'layout.ImageWithContent']
) as FC<MapClusterProps>
