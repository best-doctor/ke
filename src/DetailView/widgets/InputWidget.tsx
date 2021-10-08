import React, { forwardRef } from 'react'
import { Textarea, Input, TextareaProps, StyleProps } from '@chakra-ui/react'

import { DebounceInput } from '../../django-spa/Controls/DebounceInput'
import { useWidgetInitialization } from '../../common/hooks/useWidgetInitialization'
import { WidgetWrapper } from '../../common/components/WidgetWrapper'
import { getAccessor, getCopyHandler, getPayload } from '../utils/dataAccess'
import { EventNameEnum, WidgetTypeEnum } from '../../integration/analytics/firebase/enums'
import { pushAnalytics } from '../../integration/analytics'

import type { Accessor, WidgetProps } from '../../typing'
import { useCreateTestId } from '../../django-spa/aspects'

export type InputWidgetProps = WidgetProps & {
  isTextarea?: boolean
  height?: number
  debounce?: number
  isDisabled?: Accessor<boolean>
  textareaResize?: TextareaProps['resize']
  inputProps?: StyleProps
}

const InputWidget = forwardRef<HTMLInputElement, InputWidgetProps>((props: InputWidgetProps, ref): JSX.Element => {
  const {
    name,
    helpText,
    targetPayload,
    style,
    submitChange,
    setInitialValue,
    containerStore,
    isTextarea = true,
    height,
    debounce = 1000,
    notifier,
    copyValue,
    useClipboard,
    isDisabled,
    mainDetailObject,
    textareaResize = 'none',
    containerProps,
    labelContainerProps,
    inputProps,
  } = props
  const context = containerStore.getState()

  const { targetUrl, content, isRequired, widgetDescription } = useWidgetInitialization({ ...props, context })

  setInitialValue({ [name]: content })

  const handleChange = (value: string): void => {
    pushAnalytics({
      eventName: EventNameEnum.INPUT_CHANGE,
      widgetType: WidgetTypeEnum.INPUT,
      value,
      objectForAnalytics: props.mainDetailObject,
      ...props,
    })

    const inputPayload = getPayload(value, name, targetPayload)
    submitChange({ url: targetUrl, payload: inputPayload })
  }

  const handleCopyValue = getCopyHandler(content, copyValue)

  const { getDataTestId } = useCreateTestId()

  return (
    <WidgetWrapper
      name={name}
      style={style}
      helpText={helpText}
      description={widgetDescription}
      required={isRequired}
      notifier={notifier}
      useClipboard={useClipboard}
      copyValue={handleCopyValue}
      containerProps={containerProps}
      labelContainerProps={labelContainerProps}
      {...getDataTestId(props)}
    >
      <DebounceInput
        value={content as string}
        height={height || (isTextarea ? 263 : undefined)}
        debounceTimeout={debounce}
        element={isTextarea ? (Textarea as React.FC) : (Input as React.FC)}
        onChange={handleChange}
        inputRef={ref}
        disabled={getAccessor(isDisabled, mainDetailObject, context)}
        resize={isTextarea ? textareaResize : undefined}
        {...inputProps}
      />
    </WidgetWrapper>
  )
})

export { InputWidget }
