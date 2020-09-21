import * as React from 'react'
import styled from 'styled-components'
import { Text, FormLabel, Box } from '@chakra-ui/core'

import { useWidgetInitialization } from '../../common/hooks/useWidgetInitialization'
// import { getWidgetContent } from '../utils/dataAccess'

import type { WidgetProps } from '../../typing'

const StyledTextWidget = styled.div`
  border-width: 2px;
  border-radius: 3px;
  border-color: #cbd5e0;
  padding-left: 5px;
  padding-right: 2px;
  padding-top: 2px;
  padding-bottom: 2px;
`

const contentType = 'string'

const TextWidget = (props: WidgetProps): JSX.Element => {
  const { containerStore, style, helpText } = props

  const { content } = useWidgetInitialization({ ...props, contentType, context: containerStore.getState() })

  return (
    <Box {...style}>
      {content && (
        <>
          <FormLabel>{helpText || ''}</FormLabel>
          <StyledTextWidget>
            <Text>{content}</Text>
          </StyledTextWidget>
        </>
      )}
    </Box>
  )
}

export { TextWidget }
