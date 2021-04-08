import { Box } from '@chakra-ui/core'
import React, { useEffect, useState } from 'react'

import { useWidgetInitialization } from '../../common/hooks/useWidgetInitialization'

import type { WidgetProps } from '../../typing'
import { getAccessor, getWidgetContent } from '../utils/dataAccess'
import { WidgetWrapper } from '../../common/components/WidgetWrapper'

/**
 * Render data  as text block with props.style and props.helpText
 * Async load "data" from props.dataSource and then get content via props.displayValue if exists
 * else get "data"[props.name].
 *
 * @param props - standard widget props
 */
const AsyncReadOnlyWidget = (props: WidgetProps): JSX.Element => {
  const {
    mainDetailObject,
    containerStore,
    style,
    helpText,
    description,
    name,
    provider,
    displayValue,
    cacheTime,
  } = props

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
    <WidgetWrapper name={name} style={style} helpText={helpText} description={description}>
      <Box borderWidth="1px" borderRadius="3px" borderColor="#cbd5e0" padding="5.4px" whiteSpace="pre-line">
        {content || '\u00a0'}
      </Box>
    </WidgetWrapper>
  )
}

export { AsyncReadOnlyWidget }
