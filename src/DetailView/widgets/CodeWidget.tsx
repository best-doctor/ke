import React from 'react'
import parse from 'html-react-parser'
import styled from 'styled-components'
import { WidgetWrapper } from '../../common/components/WidgetWrapper'
import { useWidgetInitialization } from '../../common/hooks/useWidgetInitialization'
import type { WidgetProps } from '../../typing'

const StyledCodeWidget = styled.pre`
  border-width: 1px;
  border-radius: 3px;
  border-color: #cbd5e0;
  padding: 5.4px;
  white-space: pre-wrap;
  a {
    color: blue;
  }
`

const CodeWidget = (props: WidgetProps): JSX.Element => {
  const { containerStore, style, helpText, useClipboard, notifier, name } = props

  const { content } = useWidgetInitialization({ ...props, context: containerStore.getState() })

  const element = parse(content.toString())

  return (
    <WidgetWrapper name={name} style={style} helpText={helpText} useClipboard={useClipboard} notifier={notifier}>
      <StyledCodeWidget>{element}</StyledCodeWidget>
    </WidgetWrapper>
  )
}

export { CodeWidget, StyledCodeWidget }
