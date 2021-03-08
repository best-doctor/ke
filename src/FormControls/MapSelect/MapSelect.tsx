import React from 'react'
import { Button } from '@chakra-ui/core'
import { usePropState } from '@cdk/Hooks'

import { Map, MapProps, MapMarker, MapInfoWindow } from '../../Widgets/Map'

import type { Option, OptionKey } from './types'

export function MapSelect<T>({ value, onChange, options, ...others }: MapSelectProps<T>): JSX.Element {
  const [currentKeyByValue] = getOptionByValue(options, value) || []
  const [selectedKey, setSelectedKey] = usePropState(currentKeyByValue)
  const [, selectedLabel, selectedValue] = (selectedKey && getOptionByKey(options, selectedKey)) || []

  return (
    <Map {...others}>
      {options.map(([key, label]) => (
        <MapMarker key={key} position={label.coords} title={label.description} onClick={() => setSelectedKey(key)} />
      ))}
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
  children?: never
}
