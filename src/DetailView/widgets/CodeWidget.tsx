/* eslint-disable react/jsx-props-no-spreading */
/* Это legacy */
import React from 'react'
import parse from 'html-react-parser'
import styled from '@emotion/styled'

import { WidgetWrapper } from '../../common/components/WidgetWrapper'
import { useWidgetInitialization } from '../../common/hooks/useWidgetInitialization'
import type { WidgetProps } from '../../typing'
import { useCreateTestId } from '../../django-spa/aspects/test-id/TestIdProvider'

const StyledCodeWidget = styled.pre`
  border-width: 1px;
  border-radius: 3px;
  border-color: #cbd5e0;
  padding: 5.4px;
  white-space: pre-wrap;
  word-wrap: break-word;
  a {
    color: blue;
  }
`

const CodeWidget = (props: WidgetProps): JSX.Element => {
  const { containerStore, style, helpText, useClipboard, notifier, name } = props

  const { content, widgetDescription } = useWidgetInitialization({ ...props, context: containerStore.getState() })

  const element = parse(content.toString())

  const { getDataTestId } = useCreateTestId()
  return (
    <WidgetWrapper
      name={name}
      style={style}
      helpText={helpText}
      description={widgetDescription}
      useClipboard={useClipboard}
      notifier={notifier}
      {...getDataTestId(props)}
    >
      <StyledCodeWidget>{element}</StyledCodeWidget>
    </WidgetWrapper>
  )
}

export { CodeWidget, StyledCodeWidget }
