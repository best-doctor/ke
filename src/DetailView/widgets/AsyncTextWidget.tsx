import * as React from 'react'
import { Text } from '@chakra-ui/core'
import { useEffect, useState } from 'react'

import { useWidgetInitialization } from '../../common/hooks/useWidgetInitialization'

import type { WidgetProps } from '../../typing'
import { getAccessor, getWidgetContent } from '../utils/dataAccess'
import { WidgetWrapper } from '../../common/components/WidgetWrapper'
import { StyledTextWidget } from './TextWidget'

/**
 * Render data  as text block with props.style and props.helpText
 * Async load "data" from props.dataSource and then get content via props.displayValue if exists
 * else get "data"[props.name].
 *
 * @param props - standard widget props
 */
const AsyncTextWidget = (props: WidgetProps): JSX.Element => {
  const { mainDetailObject, containerStore, style, helpText, name, provider, displayValue, cacheTime } = props

  const [content, setContent] = useState<string>('')

  const context = containerStore.getState()

  const { dataResourceUrl } = useWidgetInitialization({ ...props, context })
  const effectiveCacheTime = getAccessor(cacheTime, mainDetailObject, context)

  useEffect(() => {
    provider
      .getObject(dataResourceUrl, effectiveCacheTime)
      .then((responseData: any) => setContent(getWidgetContent(name, responseData, displayValue, context) || ''))
  }, [provider, dataResourceUrl, context, displayValue, name, effectiveCacheTime])

  return (
    <WidgetWrapper style={style} helpText={helpText}>
      <StyledTextWidget>
        <Text>{content || '\u00a0'}</Text>
      </StyledTextWidget>
    </WidgetWrapper>
  )
}

export { AsyncTextWidget }
