import React from 'react'
import styled from 'styled-components'
import { WidgetProps } from '../../typing'
import { getPayload } from '../../DetailView/utils/dataAccess'
import { WidgetWrapper } from '../../common/components/WidgetWrapper'
import { useWidgetInitialization } from '../../common/hooks/useWidgetInitialization'
import { MapSelectCoordinates } from './MapSelectCoordinates'
import { Coords } from '../../Widgets/Map/types'

const StyledMapWidget = styled.div`
  border-width: 1px;
  border-radius: 3px;
  border-color: #cbd5e0;
  padding: 5.4px;
  white-space: pre-line;
  height: 600px;
`

export const MapSelectCoordinatesLegacy = (props: WidgetProps): JSX.Element => {
  const { name, style, helpText, notifier, submitChange, targetPayload, containerStore } = props
  const context = containerStore.getState()
  const { targetUrl, content } = useWidgetInitialization({ ...props, context })

  const updateCoordinates = (position: Coords | null): void => {
    const widgetPayload = getPayload(position, name, targetPayload)
    submitChange({ url: targetUrl, payload: widgetPayload })
  }

  return (
    <WidgetWrapper name={name} style={style} helpText={helpText} notifier={notifier}>
      <StyledMapWidget>
        <MapSelectCoordinates
          updateCoordinates={updateCoordinates}
          initialPosition={content as Coords}
          mapHeight={480}
        />
      </StyledMapWidget>
    </WidgetWrapper>
  )
}
