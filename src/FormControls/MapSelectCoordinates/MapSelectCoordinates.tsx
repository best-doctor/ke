import React, { useEffect, useState } from 'react'
import { Box, Button } from '@chakra-ui/react'
import { Col, Row } from 'react-flexbox-grid'

import { DebounceInput } from '@components/controls'
import { MapMarker, Map } from '../../Widgets/Map'
import { Coords } from '../../Widgets/Map/types'
import { Marker } from '../../Widgets/Map/Map'
import { Label } from '../../common/components/Label'

const moscowCoords = { lat: 55.75, lng: 37.61 }

type MapSelectCoordinatesProps = {
  initialPosition: Coords | null
  updateCoordinates: (position: Coords | null) => void
  mapHeight: number
  isClearable?: boolean
}

const safeParse = (value: string, defaultValue = undefined): number | undefined => {
  const parsedValue = parseFloat(value)
  return !Number.isNaN(parsedValue) ? parsedValue : defaultValue
}

export const MapSelectCoordinates = (props: MapSelectCoordinatesProps): JSX.Element => {
  const { initialPosition, updateCoordinates, mapHeight, isClearable = false } = props

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
      <Row bottom="xs">
        <Col xs={2}>
          <Label>Широта</Label>
          <DebounceInput
            mt={2}
            value={lat === undefined ? '' : lat.toString()}
            onChange={(v) => {
              setLat(safeParse(v))
            }}
          />
        </Col>
        <Col xs={2}>
          <Label>Долгота</Label>
          <DebounceInput
            mt={2}
            value={lng === undefined ? '' : lng.toString()}
            onChange={(v) => {
              setLng(safeParse(v))
            }}
          />
        </Col>
        <Col xs={2}>
          <Button
            mr={3}
            variant="outline"
            colorScheme="brand"
            onClick={() => {
              updateCoordinates(position)
            }}
          >
            Обновить координаты
          </Button>
        </Col>
        <Col xs={2}>
          {isClearable && (
            <Button
              variant="outline"
              colorScheme="brand"
              onClick={() => {
                setLat(undefined)
                setLng(undefined)
              }}
            >
              Очистить
            </Button>
          )}
        </Col>
      </Row>
      <Box height={mapHeight} mt={6}>
        <Map center={position || moscowCoords} zoom={12} onSearchMarkerClick={onSearchMarkerClick}>
          {position && <MapMarker key="selectMarker" position={position} draggable onDragEnd={onDragEnd} />}
        </Map>
      </Box>
    </>
  )
}
