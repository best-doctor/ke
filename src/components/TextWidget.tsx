import * as React from 'react'
import styled from 'styled-components'
import { Text, FormLabel, Box } from '@chakra-ui/core'
import { getWidgetContent } from '../utils/dataAccess'

const StyledTextWidget = styled.div`
  border-width: 2px;
  border-radius: 3px;
  border-color: #cbd5e0;
  padding-left: 5px;
  padding-right: 2px;
  padding-top: 2px;
  padding-bottom: 2px;
`

type TextWidgetProps = {
  name: string
  detailObject: any
  helpText: string
  displayValue: string | Function | undefined
  style: any
}

const TextWidget = ({ name, detailObject, displayValue, helpText, style }: TextWidgetProps): JSX.Element => {
  const content = getWidgetContent(name, detailObject, displayValue)

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
