import React from 'react'
import styled from 'styled-components'
import { Text } from '@chakra-ui/core'

import { useWidgetInitialization } from '../../common/hooks/useWidgetInitialization'
import { WidgetWrapper } from '../../common/components/WidgetWrapper'

import type { WidgetProps } from '../../typing'
import { getCopyHandler } from '../utils/dataAccess'

const StyledTextWidget = styled.div`
  border-width: 1px;
  border-radius: 3px;
  border-color: #cbd5e0;
  padding: 5.4px;
  white-space: pre-line;
`

const TextWidget = (props: WidgetProps): JSX.Element => {
  const { containerStore, style, helpText, useClipboard, copyValue, notifier, name } = props

  const { content } = useWidgetInitialization({ ...props, context: containerStore.getState() })

  return (
    <WidgetWrapper
      name={name}
      style={style}
      helpText={helpText}
      useClipboard={useClipboard}
      copyValue={getCopyHandler(content, copyValue)}
      notifier={notifier}
    >
      <StyledTextWidget>
        <Text>{content || '\u00a0'}</Text>
      </StyledTextWidget>
    </WidgetWrapper>
  )
}

export { TextWidget, StyledTextWidget }
