import React, { CSSProperties } from 'react'
import { Link, Box } from '@chakra-ui/react'

import { useWidgetInitialization } from '../../common/hooks/useWidgetInitialization'
import { WidgetWrapper } from '../../common/components/WidgetWrapper'
import { getWidgetContent } from '../utils/dataAccess'
import { EventNameEnum, WidgetTypeEnum, pushAnalytics } from '../../integration/analytics'

import type { GenericAccessor, WidgetProps } from '../../typing'

const defaultBoxStyles: CSSProperties = {
  borderWidth: '1px',
  borderRadius: '3px',
  borderColor: '#cbd5e0',
  padding: '5.4px',
}

type LinkWidgetProps = WidgetProps & { href: GenericAccessor; target?: string; boxStyle?: object }

const LinkWidget = (props: LinkWidgetProps): JSX.Element => {
  const {
    name,
    mainDetailObject,
    href,
    helpText,
    description,
    style,
    containerStore,
    target = '_blank',
    boxStyle = defaultBoxStyles,
  } = props

  const context = containerStore.getState()
  const { content } = useWidgetInitialization({ ...props, context })
  const linkHref = getWidgetContent(name, mainDetailObject, href, context)

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
    <WidgetWrapper name={name} style={style} helpText={helpText || ''} description={description}>
      <Box style={boxStyle}>
        {linkHref ? (
          <Link target={target} href={linkHref} onClick={() => handleClick()} color="teal.500">
            {content || 'Ссылка'}
          </Link>
        ) : (
          '\u00a0'
        )}
      </Box>
    </WidgetWrapper>
  )
}

export { LinkWidget }
