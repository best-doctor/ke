import * as React from 'react'
import { useEffect } from 'react'

import { Map, MapProps, Marker, InfoWindow } from '@widgets/Map'
import { useControlState } from '@forms'

import type { Option, OptionKey } from './types'

export function MapSelect<T>({ value, onChange, options, ...others }: MapSelectProps<T>): JSX.Element {
  const [currentKeyByValue] = getOptionByValue(options, value) || []
  const [selectedKey, setSelectedKey] = useControlState(currentKeyByValue)
  const [, selectedLabel, selectedValue] = (selectedKey && getOptionByKey(options, selectedKey)) || []

  useEffect(() => {
    onChange(selectedValue)
  }, [onChange, selectedValue])

  return (
    <Map {...others}>
      {options.map(([key, label]) => (
        <Marker key={key} position={label.coords} title={label.description} onClick={() => setSelectedKey(key)} />
      ))}
      {selectedLabel && <InfoWindow position={selectedLabel.coords}>{selectedLabel.infoView}</InfoWindow>}
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
  onChange: (val: T | undefined) => void
  options: readonly Option<T>[]
  children?: never
}
