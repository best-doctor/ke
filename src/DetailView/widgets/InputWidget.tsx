import React, { forwardRef } from 'react'
import { Textarea, Input } from '@chakra-ui/react'

import { DebounceInput } from '../../django-spa/Controls/DebounceInput'
import { useWidgetInitialization } from '../../common/hooks/useWidgetInitialization'
import { WidgetWrapper } from '../../common/components/WidgetWrapper'
import { getAccessor, getCopyHandler, getPayload } from '../utils/dataAccess'
import { EventNameEnum, WidgetTypeEnum } from '../../integration/analytics/firebase/enums'
import { pushAnalytics } from '../../integration/analytics'

import type { Accessor, WidgetProps } from '../../typing'

type InputWidgetProps = WidgetProps & {
  isTextarea?: boolean
  height?: number
  debounce?: number
  isDisabled?: Accessor<boolean>
}

const InputWidget = forwardRef<HTMLInputElement, InputWidgetProps>((props: InputWidgetProps, ref): JSX.Element => {
  const {
    name,
    helpText,
    description,
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
  } = props
  const context = containerStore.getState()

  const { targetUrl, content, isRequired } = useWidgetInitialization({ ...props, context })

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

  return (
    <WidgetWrapper
      name={name}
      style={style}
      helpText={helpText}
      description={description}
      required={isRequired}
      notifier={notifier}
      useClipboard={useClipboard}
      copyValue={handleCopyValue}
    >
      <DebounceInput
        value={content as string}
        height={height || (isTextarea ? 263 : undefined)}
        debounceTimeout={debounce}
        element={isTextarea ? (Textarea as React.FC) : (Input as React.FC)}
        onChange={handleChange}
        inputRef={ref}
        disabled={getAccessor(isDisabled, mainDetailObject, context)}
      />
    </WidgetWrapper>
  )
})

export { InputWidget }
