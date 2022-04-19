import React, { useEffect, useState } from 'react'
import { Box, Button } from '@chakra-ui/react'
import { Col, Row } from 'react-flexbox-grid'
import { makePartial } from '@cdk/compatibility'
import { DebounceInput } from '@components/controls'
import { Map, MapMarker, LatLng, Place } from '@components/map'

import { Label } from '../../common/components/Label'
import { SearchMarker } from './SearchMarker'

const moscowCoords = { lat: 55.75, lng: 37.61 }

type MapSelectCoordinatesProps = {
  initialPosition: LatLng | null
  updateCoordinates: (position: LatLng | null) => void
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
  const [position, setPosition] = useState<LatLng | null>(initialPosition)

  const handlePositionChange = (p: LatLng | undefined): void => {
    setLat(p?.lat)
    setLng(p?.lng)
  }

  const onSearchMarkerClick = (place: Place): void => {
    place.position && setPosition(place.position)
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
        <Col xs>
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
      <Box height={mapHeight} mt={6} position="relative">
        <Map
          center={position || moscowCoords}
          zoom={12}
          controls={{ search: { marker: makePartial(SearchMarker, { onClick: onSearchMarkerClick }) } }}
          containerStyle={{ height: mapHeight, width: '100%' }}
        >
          {position && (
            <MapMarker key="selectMarker" position={position} draggable onPositionChange={handlePositionChange} />
          )}
        </Map>
      </Box>
    </>
  )
}
