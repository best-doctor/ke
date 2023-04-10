// Это легаси
/* eslint-disable react/jsx-props-no-spreading */
import React, { CSSProperties } from 'react'
import { StylesProvider, useMultiStyleConfig } from '@chakra-ui/react'

import { useWidgetInitialization } from '../../common/hooks/useWidgetInitialization'
import { StyledWidgetWrapper } from '../../common/components/WidgetWrapper'

import type { Accessor, WidgetProps } from '../../typing'
import { getAccessor, getCopyHandler } from '../utils/dataAccess'
import { EmptyText } from '../../common/components/EmptyText'
import { useCreateTestId } from '../../django-spa/aspects'

export type ReadOnlyWidgetProps = WidgetProps & {
  innerStyle?: CSSProperties
  className?: string
  widgetClassName?: string
  isHtmlString?: Accessor<boolean>
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
    isHtmlString,
  } = props

  const { content, isRequired, widgetDescription } = useWidgetInitialization({
    ...props,
    context: containerStore?.getState(),
  })

  const styles = useMultiStyleConfig('ReadOnlyWidget', props)

  const controlStyles = { ...(styles.control || {}), ...(innerStyle || {}) }

  const { getDataTestId } = useCreateTestId()

  const isHtmlContent = getAccessor(isHtmlString) && typeof content === 'string'

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
        <EmptyText
          as={isHtmlContent ? 'div' : undefined}
          sx={controlStyles}
          className={widgetClassName}
          dangerouslySetInnerHTML={isHtmlContent ? { __html: content } : undefined}
        >
          {isHtmlContent ? undefined : content}
        </EmptyText>
      </StyledWidgetWrapper>
    </StylesProvider>
  )
}

export { ReadOnlyWidget }
