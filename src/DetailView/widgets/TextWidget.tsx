import * as React from 'react'
import styled from 'styled-components'
import { Text } from '@chakra-ui/core'

import { useWidgetInitialization } from '../../common/hooks/useWidgetInitialization'
import { WidgetWrapper } from '../../common/components/WidgetWrapper'

import type { WidgetProps } from '../../typing'

const StyledTextWidget = styled.div`
  border-width: 1px;
  border-radius: 3px;
  border-color: #cbd5e0;
  padding: 5.4px;
  white-space: pre-line;
`

const TextWidget = (props: WidgetProps): JSX.Element => {
  const { containerStore, style, helpText } = props

  const { content } = useWidgetInitialization({ ...props, context: containerStore.getState() })

  return (
    <WidgetWrapper style={style} helpText={helpText}>
      <StyledTextWidget>
        <Text>{content || '\u00a0'}</Text>
      </StyledTextWidget>
    </WidgetWrapper>
  )
}

export { TextWidget, StyledTextWidget }
