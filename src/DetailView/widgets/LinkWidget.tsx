import React from 'react'
import { Link, useMultiStyleConfig, StylesProvider, LinkProps } from '@chakra-ui/react'

import { useWidgetInitialization } from '../../common/hooks/useWidgetInitialization'
import { StyledWidgetWrapper } from '../../common/components/WidgetWrapper'
import { getWidgetContent } from '../utils/dataAccess'
import { EventNameEnum, WidgetTypeEnum, pushAnalytics } from '../../integration/analytics'

import type { GenericAccessor, WidgetProps } from '../../typing'
import { useTestId } from '../../django-spa/aspects/test-id/TestIdProvider'


export type LinkWidgetProps = WidgetProps & {
  href: GenericAccessor
  target?: string
  boxStyle?: object
  linkProps?: Omit<LinkProps, 'href'>
}

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
    linkProps,
  } = props

  const context = containerStore.getState()
  const { content } = useWidgetInitialization({ ...props, context })
  const linkHref = getWidgetContent(name, mainDetailObject, href, context)

  const styles = useMultiStyleConfig('LinkWidget', props)

  const handleClick = (): void => {
    pushAnalytics({
      eventName: EventNameEnum.LINK_CLICK,
      widgetType: WidgetTypeEnum.ACTION,
      value: linkHref,
      objectForAnalytics: props.mainDetailObject,
      ...props,
    })
  }

  const dataTestId = useTestId(props)
  return (
    <StylesProvider value={styles}>
      <StyledWidgetWrapper
        data-test-id={dataTestId}
        name={name}
        style={style}
        helpText={helpText || ''}
        description={description}
      >
        <>
          {linkHref ? (
            <Link target={target} href={linkHref} onClick={() => handleClick()} sx={styles.control} {...linkProps}>
              {content || 'Ссылка'}
            </Link>
          ) : (
            '-'
          )}
        </>
      </StyledWidgetWrapper>
    </StylesProvider>
  )
}

export { LinkWidget }
