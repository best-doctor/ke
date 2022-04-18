import React, { CSSProperties, FC } from 'react'
import { StandaloneSearchBox } from '@react-google-maps/api'

import { Place } from './types'

interface SearchControlProps {
  inputStyle?: CSSProperties
  onPlaceChange?: (place: Place | undefined) => void
  placeholder?: string
}

const defaultInputStyle: CSSProperties = {
  backgroundColor: 'white',
  border: `1px solid #cbd5e0`,
  boxSizing: 'border-box',
  boxShadow: `0px 2px 7px rgba(0, 0, 0, 0.15)`,
  marginBottom: '5.4px',
  outline: 'none',
  padding: '0 12px',
  textOverflow: 'ellipses',

  position: 'absolute',
  left: '10px',
  top: '10px',
  zIndex: '1',

  width: '70%',
  height: '40px',
}

export const SearchControl: FC<SearchControlProps> = ({
  inputStyle = defaultInputStyle,
  placeholder,
  onPlaceChange,
}) => {
  function handlePlacesChanged(this: google.maps.places.SearchBox): void {
    // eslint-disable-next-line react/no-this-in-sfc
    const place = (this.getPlaces() || [])[0]

    onPlaceChange &&
      onPlaceChange(
        place
          ? {
              address: place.formatted_address,
              title: place.name,
              position: place.geometry?.location?.toJSON(),
            }
          : undefined
      )
  }

  return (
    <StandaloneSearchBox onPlacesChanged={handlePlacesChanged}>
      <input type="text" placeholder={placeholder} style={inputStyle} />
    </StandaloneSearchBox>
  )
}
