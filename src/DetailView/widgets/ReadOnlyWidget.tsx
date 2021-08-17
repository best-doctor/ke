import React, { CSSProperties } from 'react'
import { StylesProvider, Text, useMultiStyleConfig } from '@chakra-ui/react'

import { useWidgetInitialization } from '../../common/hooks/useWidgetInitialization'
import { StyledWidgetWrapper } from '../../common/components/WidgetWrapper'

import type { WidgetProps } from '../../typing'
import { getCopyHandler } from '../utils/dataAccess'

const ReadOnlyWidget = (props: WidgetProps & { innerStyle?: CSSProperties }): JSX.Element => {
  const {
    containerStore,
    style,
    helpText,
    description,
    useClipboard,
    copyValue,
    notifier,
    name,
    innerStyle,
    containerProps,
    labelContainerProps,
  } = props

  const { content, isRequired } = useWidgetInitialization({ ...props, context: containerStore.getState() })

  const styles = useMultiStyleConfig('ReadOnlyWidget', props)

  const controlStyles = { ...(styles.control || {}), ...(innerStyle || {}) }

  return (
    <StylesProvider value={styles}>
      <StyledWidgetWrapper
        name={name}
        style={style}
        helpText={helpText}
        description={description}
        useClipboard={useClipboard}
        copyValue={getCopyHandler(content, copyValue)}
        notifier={notifier}
        required={isRequired}
        containerProps={containerProps}
        labelContainerProps={labelContainerProps}
      >
        <Text sx={controlStyles}>{content || '\u00a0'}</Text>
      </StyledWidgetWrapper>
    </StylesProvider>
  )
}

export { ReadOnlyWidget }
