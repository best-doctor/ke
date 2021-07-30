import React, { CSSProperties } from 'react'
import { Text, useStyleConfig } from '@chakra-ui/react'

import { useWidgetInitialization } from '../../common/hooks/useWidgetInitialization'
import { WidgetWrapper } from '../../common/components/WidgetWrapper'

import type { WidgetProps } from '../../typing'
import { getCopyHandler } from '../utils/dataAccess'

const defaultInnerProps = {
  padding: '5.4px',
  whiteSpace: 'pre-line',
} as const

const ReadOnlyWidget = (props: WidgetProps & { innerStyle?: CSSProperties }): JSX.Element => {
  const { containerStore, style, helpText, description, useClipboard, copyValue, notifier, name, innerStyle } = props

  const { content, isRequired } = useWidgetInitialization({ ...props, context: containerStore.getState() })
  const innerProps = innerStyle
    ? {
        style: innerStyle,
      }
    : defaultInnerProps

  const styles = useStyleConfig('ReadOnlyWidget', props)

  return (
    <WidgetWrapper
      name={name}
      style={style}
      helpText={helpText}
      description={description}
      useClipboard={useClipboard}
      copyValue={getCopyHandler(content, copyValue)}
      notifier={notifier}
      required={isRequired}
    >
      <Text sx={styles} {...innerProps}>
        {content || '\u00a0'}
      </Text>
    </WidgetWrapper>
  )
}

export { ReadOnlyWidget }
