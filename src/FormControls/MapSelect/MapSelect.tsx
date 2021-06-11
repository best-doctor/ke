import React, { useCallback, useState } from 'react'
import { Button } from '@chakra-ui/react'
import { usePropState } from '@cdk/Hooks'

import { Map, MapProps, MapMarker, MapInfoWindow } from '../../Widgets/Map'

import type { LatLng, Option, OptionKey } from './types'

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
  const [currentKeyByValue] = getOptionByValue(options, value) || []
  const [selectedKey, setSelectedKey] = usePropState(currentKeyByValue)
  const [, selectedLabel, selectedValue] = (selectedKey && getOptionByKey(options, selectedKey)) || []
  const handleZoomChanged = useCallback(
    (z: number) => {
      setCurrentZoom(z)
      onZoomChanged && onZoomChanged(z)
    },
    [setCurrentZoom, onZoomChanged]
  )
  return (
    <Map zoom={currentZoom} center={currentCenter} onZoomChanged={handleZoomChanged} {...others}>
      {options.map(([key, optionDesc]) => (
        <MapMarker
          key={key}
          position={optionDesc.coords}
          title={optionDesc.description}
          label={optionDesc.label}
          icon={optionDesc.icon}
          onClick={() => setSelectedKey(key)}
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
              setCurrentZoom((prev) => (prev || 1) + 2)
              setCurrentCenter(pos)
            }}
          />
        )
      })}
      {selectedLabel && (
        <MapInfoWindow position={selectedLabel.coords} onCloseClick={() => setSelectedKey(undefined)}>
          <>
            {selectedLabel.infoView}
            {onChange && <Button onClick={() => onChange(selectedValue)}>Выбрать</Button>}
          </>
        </MapInfoWindow>
      )}
    </Map>
  )
}

function getOptionByKey<T>(options: readonly Option<T>[], searchKey: OptionKey): Option<T> | undefined {
  return options.find(([key]) => key === searchKey)
}

function getOptionByValue<T>(options: readonly Option<T>[], searchValue: T): Option<T> | undefined {
  return options.find(([, , value]) => value === searchValue)
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
  bbox: [number, number, number, number]
}
