import * as React from 'react'
import { Link } from '@chakra-ui/core'
import styled from 'styled-components'

import { useWidgetInitialization } from '../../common/hooks/useWidgetInitialization'
import { WidgetWrapper } from '../../common/components/WidgetWrapper'
import { getWidgetContent } from '../utils/dataAccess'
import { EventNameEnum, WidgetTypeEnum, pushAnalytics } from '../../integration/analytics'

import type { GenericAccessor, WidgetProps } from '../../typing'

const StyledLinkWidget = styled.div`
  border-width: 2px;
  border-radius: 3px;
  border-color: #cbd5e0;
  padding-left: 5px;
  padding-right: 2px;
  padding-top: 2px;
  padding-bottom: 2px;
`

type LinkWidgetProps = WidgetProps & { href: GenericAccessor; target?: string }

const LinkWidget = (props: LinkWidgetProps): JSX.Element => {
  const { name, mainDetailObject, href, helpText, style, containerStore, target = '_blank' } = props

  const context = containerStore.getState()
  const { content } = useWidgetInitialization({ ...props, context })
  const linkHref = getWidgetContent(name, mainDetailObject, href)

  const handleClick = (): void => {
    pushAnalytics({
      eventName: EventNameEnum.LINK_CLICK,
      widgetType: WidgetTypeEnum.ACTION,
      value: linkHref,
      objectForAnalytics: props.mainDetailObject,
      ...props,
    })
  }

  return (
    <WidgetWrapper style={style} helpText={helpText || ''}>
      <StyledLinkWidget>
        <Link target={target} href={linkHref} onClick={() => handleClick()} color="teal.500">
          {content}
        </Link>
      </StyledLinkWidget>
    </WidgetWrapper>
  )
}

export { LinkWidget }
