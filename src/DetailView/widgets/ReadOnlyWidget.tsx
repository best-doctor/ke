import React, { CSSProperties } from 'react'
import { StylesProvider, useMultiStyleConfig } from '@chakra-ui/react'

import { useWidgetInitialization } from '../../common/hooks/useWidgetInitialization'
import { StyledWidgetWrapper } from '../../common/components/WidgetWrapper'

import type { WidgetProps } from '../../typing'
import { getCopyHandler } from '../utils/dataAccess'
import { EmptyText } from '../../common/components/EmptyText'
import { useCreateTestId } from '../../django-spa/aspects'

export type ReadOnlyWidgetProps = WidgetProps & {
  innerStyle?: CSSProperties
  className?: string
  widgetClassName?: string
}

const ReadOnlyWidget = (props: ReadOnlyWidgetProps): JSX.Element => {
  const {
    containerStore,
    style,
    helpText,
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

  const { content, isRequired, widgetDescription } = useWidgetInitialization({ ...props, context: containerStore.getState() })

  const styles = useMultiStyleConfig('ReadOnlyWidget', props)

  const controlStyles = { ...(styles.control || {}), ...(innerStyle || {}) }

  const { getDataTestId } = useCreateTestId()

  return (
    <StylesProvider value={styles}>
      <StyledWidgetWrapper
        className={className}
        name={name}
        style={style}
        helpText={helpText}
        description={widgetDescription}
        useClipboard={useClipboard}
        copyValue={getCopyHandler(content, copyValue)}
        notifier={notifier}
        required={isRequired}
        containerProps={containerProps}
        labelContainerProps={labelContainerProps}
        {...getDataTestId(props)}
      >
        <EmptyText sx={controlStyles} className={widgetClassName}>
          {content}
        </EmptyText>
      </StyledWidgetWrapper>
    </StylesProvider>
  )
}

export { ReadOnlyWidget }
