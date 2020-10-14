import * as React from 'react'
import { Text, FormLabel, Box } from '@chakra-ui/core'
import { useEffect, useState } from 'react'

import { useWidgetInitialization } from '../../common/hooks/useWidgetInitialization'

import type { WidgetProps } from '../../typing'
import { getWidgetContent } from '../utils/dataAccess'
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

export { AsyncTextWidget }
