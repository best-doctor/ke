import * as React from 'react'
import { Link } from '@chakra-ui/core'
import styled from 'styled-components'

import { WidgetWrapper } from '../../common/components/WidgetWrapper'
import { getWidgetContent } from '../utils/dataAccess'
import { EventNameEnum, WidgetTypeEnum, pushAnalytics } from '../../integration/analytics'

import type { GenericAccessor } from '../../typing'
import type { BaseAnalytic } from '../../integration/analytics'

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
  resource: string
  analytics: BaseAnalytic | undefined
  widgetAnalytics: Function | boolean | undefined
  detailObject: any
  href: string | Function
  displayValue: GenericAccessor
  helpText: string
  viewType: string
  style: any
}

const LinkWidget = (props: LinkWidgetProps): JSX.Element => {
  const { name, detailObject, href, displayValue, helpText, style } = props

  const content = getWidgetContent(name, detailObject, displayValue)
  const linkHref = getWidgetContent(name, detailObject, href)

  const handleClick = (): void => {
    pushAnalytics({ eventName: EventNameEnum.LINK_CLICK, widgetType: WidgetTypeEnum.ACTION, value: linkHref, ...props })
  }

  return (
    <WidgetWrapper style={style} helpText={helpText || ''}>
      <StyledLinkWidget>
        <Link target="_blank" href={linkHref} onClick={() => handleClick()} color="teal.500">
          {content}
        </Link>
      </StyledLinkWidget>
    </WidgetWrapper>
  )
}

export { LinkWidget }
