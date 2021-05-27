import React, { ChangeEvent, useEffect, useState } from 'react'
import { Box, Button, FormLabel, Input } from '@chakra-ui/react'
import { DebounceInput } from 'react-debounce-input'

import { MapMarker, Map } from '../../Widgets/Map'
import { Coords } from '../../Widgets/Map/types'
import { Marker } from '../../Widgets/Map/Map'

const moscowCoords = { lat: 55.75, lng: 37.61 }

type MapSelectCoordinatesProps = {
  initialPosition: Coords | null
  updateCoordinates: (position: Coords | null) => void
  mapHeight: number
}

const safeParse = (value: string, defaultValue = undefined): number | undefined => {
  const parsedValue = parseFloat(value)
  return !Number.isNaN(parsedValue) ? parsedValue : defaultValue
}

export const MapSelectCoordinates = (props: MapSelectCoordinatesProps): JSX.Element => {
  const { initialPosition, updateCoordinates, mapHeight } = props

  const [lat, setLat] = useState<number | undefined>(initialPosition?.lat)
  const [lng, setLng] = useState<number | undefined>(initialPosition?.lng)
  const [position, setPosition] = useState<Coords | null>(initialPosition)

  const onDragEnd = (coordinates: { latLng: { lat: () => number; lng: () => number } }): void => {
    setLat(coordinates.latLng.lat())
    setLng(coordinates.latLng.lng())
  }

  const onSearchMarkerClick = (marker: Marker): void => {
    setPosition(marker.position)
  }

  useEffect(() => {
    if (lat !== undefined && lng !== undefined) {
      setPosition({ lat, lng })
    }
    if (lat === undefined && lng === undefined) {
      setPosition(null)
    }
  }, [lat, lng])

  return (
    <>
      <Box display="flex">
        <FormLabel mt={5}>Широта</FormLabel>
        <DebounceInput
          value={lat === undefined ? '' : lat}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setLat(safeParse(event.target.value))
          }}
          debounceTimeout={1000}
          element={Input as React.FC}
        />
        <FormLabel mt={5} ml={5}>
          Долгота
        </FormLabel>
        <DebounceInput
          value={lng === undefined ? '' : lng}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setLng(safeParse(event.target.value))
          }}
          debounceTimeout={1000}
          element={Input as React.FC}
        />
      </Box>
      <Box display="flex" mb={5}>
        <Button
          onClick={() => {
            updateCoordinates(position)
          }}
          mr={5}
        >
          Обновить координаты
        </Button>
        <Button
          onClick={() => {
            setLat(undefined)
            setLng(undefined)
          }}
        >
          Очистить
        </Button>
      </Box>
      <Box height={mapHeight}>
        <Map center={position || moscowCoords} zoom={12} onSearchMarkerClick={onSearchMarkerClick}>
          {position && <MapMarker key="selectMarker" position={position} draggable onDragEnd={onDragEnd} />}
        </Map>
      </Box>
    </>
  )
}
