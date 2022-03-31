import React, { FC } from 'react'
import { Place, MapMarker } from '@components/map'

interface SearchMarkerProps {
  place: Place
  onClick: (place: Place) => void
}

export const SearchMarker: FC<SearchMarkerProps> = ({ place, onClick }) =>
  place.position ? <MapMarker position={place.position} onClick={() => onClick(place)} /> : <></>
