import React from 'react'
import styled from 'styled-components'
import { WidgetProps } from '../../typing'
import { WidgetWrapper } from '../../common/components/WidgetWrapper'
import { useWidgetInitialization } from '../../common/hooks/useWidgetInitialization'
import { ReadOnlyMap } from './ReadOnlyMap'
import { Coords } from '../../Widgets/Map/types'

const StyledMapWidget = styled.div`
  padding: 5.4px;
  white-space: pre-line;
  height: 490px;
`

export const ReadOnlyMapLegacy = (props: WidgetProps): JSX.Element => {
  const { name, style, helpText, notifier, containerStore } = props
  const context = containerStore.getState()
  const { content } = useWidgetInitialization({ ...props, context })

  return (
    <WidgetWrapper name={name} style={style} helpText={helpText} notifier={notifier}>
      <StyledMapWidget>
        <ReadOnlyMap position={content as Coords} mapHeight={480} />
      </StyledMapWidget>
    </WidgetWrapper>
  )
}
