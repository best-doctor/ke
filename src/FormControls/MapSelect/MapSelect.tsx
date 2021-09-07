import React, { useCallback, useState } from 'react'
import { Button, Flex } from '@chakra-ui/react'
import { usePropState } from '@cdk/Hooks'

import { Map, MapProps, MapMarker, MapInfoWindow } from '../../Widgets/Map'

import type { LatLng, Option } from './types'

export function MapSelect<T>({
  value,
  onChange,
  options,
  clusters,
  zoom,
  center,
  onZoomChanged,
  ...others
}: MapSelectProps<T>): JSX.Element {
  const [currentZoom, setCurrentZoom] = useState(zoom)
  const [currentCenter, setCurrentCenter] = usePropState(center)
  const currentOption = getOptionByValue(options, value)
  const [openedOption, setOpenedOption] = useState(currentOption)

  const allOptions = [...options]
  if (openedOption && !options.find((option) => option[0] === openedOption[0])) {
    allOptions.push(openedOption)
  }

  const handleZoomChanged = useCallback(
    (z: number) => {
      setCurrentZoom(z)
      onZoomChanged && onZoomChanged(z)
    },
    [setCurrentZoom, onZoomChanged]
  )

  const cleanOpenedOption = useCallback(() => setOpenedOption(undefined), [])

  return (
    <Map
      zoom={currentZoom}
      center={currentCenter}
      onZoomChanged={handleZoomChanged}
      searchMarkerRadius={2000}
      {...others}
    >
      {allOptions.map((option) => (
        <MapMarker
          key={option[0]}
          position={option[1].coords}
          title={option[1].description}
          label={option[1].label}
          icon={option[1].icon}
          onClick={() => setOpenedOption(option)}
        />
      ))}
      {clusters.map((cluster) => {
        const pos = cluster.point.coordinates
        return (
          <MapMarker
            key={`${pos.lat}-${pos.lng}`}
            icon="https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m1.png"
            label={cluster.count.toString()}
            position={pos}
            onClick={() => {
              setCurrentZoom((prev) => {
                if (!cluster.bbox) {
                  return (prev || 1) + 2
                }
                const [latSW, lngSW, latNE, lngNE] = cluster.bbox
                return getBoundsZoomLevel(
                  { lat: latNE, lng: lngNE },
                  { lat: latSW, lng: lngSW },
                  { height: 400, width: 1000 }
                )
              })
              setCurrentCenter(pos)
            }}
          />
        )
      })}
      {openedOption && (
        <MapInfoWindow
          position={openedOption[1].coords}
          onCloseClick={() => setOpenedOption(undefined)}
          options={{ maxWidth: 784 }}
        >
          <>
            {openedOption[1].infoView(cleanOpenedOption)}
            <Flex alignItems="center" mt={5}>
              {onChange && <Button onClick={() => onChange(openedOption[2])}>Выбрать</Button>}
              {openedOption[1].secondaryAction}
            </Flex>
          </>
        </MapInfoWindow>
      )}
    </Map>
  )
}

function getOptionByValue<T>(options: readonly Option<T>[], searchValue: T | undefined): Option<T> | undefined {
  return options.find(([, , value]) => value === searchValue)
}

function getBoundsZoomLevel(ne: LatLng, sw: LatLng, mapDim: { height: number; width: number }): number {
  const WORLD_DIM = { height: 256, width: 256 }
  const ZOOM_MAX = 21

  function latRad(lat: number): number {
    const sin = Math.sin((lat * Math.PI) / 180)
    const radX2 = Math.log((1 + sin) / (1 - sin)) / 2
    return Math.max(Math.min(radX2, Math.PI), -Math.PI) / 2
  }

  function zoom(mapPx: number, worldPx: number, fraction: number): number {
    return Math.floor(Math.log(mapPx / worldPx / fraction) / Math.LN2)
  }

  const latFraction = (latRad(ne.lat) - latRad(sw.lat)) / Math.PI

  const lngDiff = ne.lng - sw.lng
  const lngFraction = (lngDiff < 0 ? lngDiff + 360 : lngDiff) / 360

  const latZoom = zoom(mapDim.height, WORLD_DIM.height, latFraction)
  const lngZoom = zoom(mapDim.width, WORLD_DIM.width, lngFraction)

  return Math.min(latZoom, lngZoom, ZOOM_MAX)
}

export type MapSelectProps<T> = MapProps & {
  value?: T
  onChange?: (val: T | undefined) => void
  options: readonly Option<T>[]
  clusters: readonly Cluster[]
  children?: never
}

interface Cluster {
  count: number
  point: { coordinates: LatLng }
  bbox?: [number, number, number, number]
}
