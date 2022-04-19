import React, { ReactElement, useMemo } from 'react'

import { MapListProps, MapListItem, MapList } from '../MapList'

import { MapSelectOption } from './types'
import { getKeyField } from './utils'

export interface MapSelectProps<T>
  extends Pick<
    MapListProps<MapListItem>,
    'containerStyle' | 'clusters' | 'onViewChange' | 'initialZoom' | 'initialCenter' | 'onLoad'
  > {
  options: MapSelectOption<T>[]
  value: T | undefined
  onChange: (v: T | undefined) => void
  getKey: (v: T) => string
}

export const MapSelect = <T,>({
  containerStyle,
  clusters,
  onViewChange,
  initialZoom,
  initialCenter,
  options,
  value,
  onChange,
  getKey,
  onLoad,
}: MapSelectProps<T>): ReactElement => {
  const valueKey = value !== undefined ? getKey(value) : undefined
  const items = useMemo(
    () =>
      options.map(({ marker, value: v }) => {
        const key = getKey(v)
        return {
          ...marker,
          info: marker.info(valueKey !== undefined && key === valueKey, onChange ? () => onChange(v) : undefined),
          key,
        }
      }),
    [options, valueKey, getKey, onChange]
  )

  return (
    <MapList
      getKey={getKeyField}
      items={items}
      containerStyle={containerStyle}
      clusters={clusters}
      onViewChange={onViewChange}
      initialCenter={initialCenter}
      initialZoom={initialZoom}
      initialOpenedKey={valueKey}
      onLoad={onLoad}
    />
  )
}
