// Это легаси
/* eslint-disable react/jsx-props-no-spreading */
import React, { forwardRef, useEffect } from 'react'
import { Textarea, Input, TextareaProps, StyleProps } from '@chakra-ui/react'
import { useStore } from 'effector-react'

import { DebounceInput } from '@components/controls'
import { useCreateTestId } from '@aspects/test-id/TestIdProvider'
import { useWidgetInitialization } from '../../common/hooks/useWidgetInitialization'
import { WidgetWrapper } from '../../common/components/WidgetWrapper'
import { getAccessor, getCopyHandler, getPayload } from '../utils/dataAccess'

import type { Accessor, WidgetProps } from '../../typing'

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
  const context = useStore(containerStore)

  const { targetUrl, content, isRequired, widgetDescription } = useWidgetInitialization({ ...props, context })

  useEffect(() => {
    setInitialValue({ [name]: content })
  }, [setInitialValue, name, content])

  const handleChange = (value: string): void => {
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
        name={name}
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
