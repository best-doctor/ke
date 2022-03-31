// Это легаси
/* eslint-disable react/jsx-props-no-spreading */
import React, { CSSProperties } from 'react'
import styled from 'styled-components'
import { LatLng, MarkerIcon } from '@components/map'

import { Accessor, WidgetProps } from '../../typing'
import { WidgetWrapper } from '../../common/components/WidgetWrapper'
import { useWidgetInitialization } from '../../common/hooks/useWidgetInitialization'
import { ReadOnlyMap } from './ReadOnlyMap'
import { getAccessor } from '../../DetailView/utils/dataAccess'

const StyledMapWidget = styled.div<{ height: number }>`
  white-space: pre-line;
  height: ${(p) => p.height}px;
  border-radius: 4px;
`

type ReadOnlyMapLegacyProps = WidgetProps & {
  icon?: Accessor<MarkerIcon>
  mapHeight?: Accessor<number>
  zoom?: number
  mapContainerStyle?: CSSProperties
}

export const ReadOnlyMapLegacy = (props: ReadOnlyMapLegacyProps): JSX.Element => {
  const { name, style, helpText, notifier, containerStore, mainDetailObject, icon, mapHeight = 480, ...rest } = props
  const context = containerStore.getState()
  const { content, widgetDescription } = useWidgetInitialization({ ...props, context })
  const height = getAccessor(mapHeight, mainDetailObject, context) as number
  const markerIcon = getAccessor(icon, mainDetailObject, context)

  return (
    <WidgetWrapper name={name} style={style} helpText={helpText} notifier={notifier} description={widgetDescription}>
      <StyledMapWidget height={height + 10}>
        <ReadOnlyMap position={content as LatLng} mapHeight={height} icon={markerIcon} {...rest} />
      </StyledMapWidget>
    </WidgetWrapper>
  )
}
