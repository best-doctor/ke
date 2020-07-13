import * as React from 'react'
import styled from 'styled-components'
import { Text } from '@chakra-ui/core'

const StyledTextWidget = styled.div`
  border-width: 2px;
  border-radius: 3px;
  border-color: #cbd5e0;
  padding-left: 2px;
  padding-right: 2px;
  padding-top: 2px;
`

const TextWidget = (props: any): JSX.Element => {
  const { children } = props

  return (
    <StyledTextWidget {...props}>
      <Text>{children}</Text>
    </StyledTextWidget>
  )
}

export { TextWidget }
