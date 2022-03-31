import React from 'react'
import styled from 'styled-components'
import { LatLng } from '@components/map'

import { WidgetProps } from '../../typing'
import { getPayload } from '../../DetailView/utils/dataAccess'
import { WidgetWrapper } from '../../common/components/WidgetWrapper'
import { useWidgetInitialization } from '../../common/hooks/useWidgetInitialization'
import { MapSelectCoordinates } from './MapSelectCoordinates'

const StyledMapWidget = styled.div`
  padding: 5.4px;
  white-space: pre-line;
  height: 600px;
`

export const MapSelectCoordinatesLegacy = (props: WidgetProps & { isClearable?: boolean }): JSX.Element => {
  const { name, style, helpText, notifier, submitChange, targetPayload, containerStore, isClearable } = props
  const context = containerStore.getState()
  const { targetUrl, content, widgetDescription } = useWidgetInitialization({ ...props, context })

  const updateCoordinates = (position: LatLng | null): void => {
    const widgetPayload = getPayload(position, name, targetPayload)
    submitChange({ url: targetUrl, payload: widgetPayload })
  }

  return (
    <WidgetWrapper name={name} style={style} helpText={helpText} notifier={notifier} description={widgetDescription}>
      <StyledMapWidget>
        <MapSelectCoordinates
          updateCoordinates={updateCoordinates}
          initialPosition={content as LatLng}
          mapHeight={480}
          isClearable={isClearable}
        />
      </StyledMapWidget>
    </WidgetWrapper>
  )
}
