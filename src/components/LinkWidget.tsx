import * as React from 'react'
import { Link, FormLabel, Box } from '@chakra-ui/core'
import styled from 'styled-components'
import { getWidgetContent } from '../utils/dataAccess'

const StyledLinkWidget = styled.div`
  border-width: 2px;
  border-radius: 3px;
  border-color: #cbd5e0;
  padding-left: 5px;
  padding-right: 2px;
  padding-top: 2px;
  padding-bottom: 2px;
`

type LinkWidgetProps = {
  name: string
  detailObject: any
  href: string | Function
  displayValue: string | Function | undefined
  helpText: string
  style: any
}

const LinkWidget = ({ name, detailObject, href, displayValue, helpText, style }: LinkWidgetProps): JSX.Element => {
  const content = getWidgetContent(name, detailObject, displayValue)
  const linkHref = getWidgetContent(name, detailObject, href)

  return (
    <Box {...style}>
      <FormLabel>{helpText || ''}</FormLabel>
      <StyledLinkWidget>
        <Link target="_blank" href={linkHref}>
          {content}
        </Link>
      </StyledLinkWidget>
    </Box>
  )
}

export { LinkWidget }
