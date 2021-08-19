import React, { CSSProperties } from 'react'
import { StylesProvider, useMultiStyleConfig } from '@chakra-ui/react'

import { useWidgetInitialization } from '../../common/hooks/useWidgetInitialization'
import { StyledWidgetWrapper } from '../../common/components/WidgetWrapper'

import type { WidgetProps } from '../../typing'
import { getCopyHandler } from '../utils/dataAccess'
import { EmptyText } from '../../common/components/EmptyText'

const ReadOnlyWidget = (
  props: WidgetProps & { innerStyle?: CSSProperties; className?: string; widgetClassName?: string }
): JSX.Element => {
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
    className,
    widgetClassName,
  } = props

  const { content, isRequired } = useWidgetInitialization({ ...props, context: containerStore.getState() })

  const styles = useMultiStyleConfig('ReadOnlyWidget', props)

  const controlStyles = { ...(styles.control || {}), ...(innerStyle || {}) }

  return (
    <StylesProvider value={styles}>
      <StyledWidgetWrapper
        className={className}
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
        <EmptyText sx={controlStyles} className={widgetClassName}>
          {content}
        </EmptyText>
      </StyledWidgetWrapper>
    </StylesProvider>
  )
}

export { ReadOnlyWidget }
