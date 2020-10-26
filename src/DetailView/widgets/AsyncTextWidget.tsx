import * as React from 'react'
import { Text } from '@chakra-ui/core'
import { useEffect, useState } from 'react'

import { useWidgetInitialization } from '../../common/hooks/useWidgetInitialization'

import type { WidgetProps } from '../../typing'
import { getWidgetContent } from '../utils/dataAccess'
import { WidgetWrapper } from '../../common/components/WidgetWrapper'
import { StyledTextWidget } from './TextWidget'

const AsyncTextWidget = (props: WidgetProps): JSX.Element => {
  const { containerStore, style, helpText, name, provider, displayValue } = props

  const [content, setContent] = useState<string>('')

  const context = containerStore.getState()

  const { dataResourceUrl } = useWidgetInitialization({ ...props, context })

  useEffect(() => {
    provider
      .getObject(dataResourceUrl)
      .then((responseData: any) => setContent(getWidgetContent(name, responseData, displayValue, context) || ''))
  }, [provider, dataResourceUrl, context, displayValue, name])

  return (
    <WidgetWrapper style={style} helpText={helpText}>
      <StyledTextWidget>
        <Text>{content || '\u00a0'}</Text>
      </StyledTextWidget>
    </WidgetWrapper>
  )
}

export { AsyncTextWidget }
