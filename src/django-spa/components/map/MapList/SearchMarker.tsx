import React, { FC } from 'react'

import { MapCircle, Place } from '../Map'

export interface SearchMarkerProps {
  place: Place
  radius: number
}

const circleOptions = {
  strokeColor: '#002aff',
  strokeOpacity: 0.6,
  strokeWeight: 2,
  fillColor: '#0748ee',
  fillOpacity: 0.25,
}

export const SearchMarker: FC<SearchMarkerProps> = ({ place, radius }) =>
  place.position ? <MapCircle center={place.position} radius={radius} options={circleOptions} /> : <></>
