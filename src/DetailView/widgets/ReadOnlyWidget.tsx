import React from 'react'
import { Box } from '@chakra-ui/core'

import { useWidgetInitialization } from '../../common/hooks/useWidgetInitialization'
import { WidgetWrapper } from '../../common/components/WidgetWrapper'

import type { WidgetProps } from '../../typing'
import { getCopyHandler } from '../utils/dataAccess'

const ReadOnlyWidget = (props: WidgetProps): JSX.Element => {
  const { containerStore, style, helpText, description, useClipboard, copyValue, notifier, name } = props

  const { content } = useWidgetInitialization({ ...props, context: containerStore.getState() })

  return (
    <WidgetWrapper
      name={name}
      style={style}
      helpText={helpText}
      description={description}
      useClipboard={useClipboard}
      copyValue={getCopyHandler(content, copyValue)}
      notifier={notifier}
    >
      <Box borderWidth="1px" borderRadius="3px" borderColor="#cbd5e0" padding="5.4px" whiteSpace="pre-line">
        {content || '\u00a0'}
      </Box>
    </WidgetWrapper>
  )
}

export { ReadOnlyWidget }
