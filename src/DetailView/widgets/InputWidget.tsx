import React, { forwardRef } from 'react'
import { DebounceInput } from 'react-debounce-input'
import { Textarea, Input } from '@chakra-ui/react'

import { useWidgetInitialization } from '../../common/hooks/useWidgetInitialization'
import { WidgetWrapper } from '../../common/components/WidgetWrapper'
import { getCopyHandler, getPayload } from '../utils/dataAccess'
import { EventNameEnum, WidgetTypeEnum } from '../../integration/analytics/firebase/enums'
import { pushAnalytics } from '../../integration/analytics'

import type { WidgetProps } from '../../typing'

type InputWidgetProps = WidgetProps & { isTextarea?: boolean; height?: number; debounce?: number }

const InputWidget = forwardRef<HTMLInputElement, InputWidgetProps>(
  (props: InputWidgetProps, ref): JSX.Element => {
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
    } = props
    const context = containerStore.getState()

    const { targetUrl, content, isRequired } = useWidgetInitialization({ ...props, context })

    setInitialValue({ [name]: content })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
      pushAnalytics({
        eventName: EventNameEnum.INPUT_CHANGE,
        widgetType: WidgetTypeEnum.INPUT,
        value: e,
        objectForAnalytics: props.mainDetailObject,
        ...props,
      })

      const inputPayload = getPayload(e.target.value, name, targetPayload)
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
          resize="none"
          height={height || (isTextarea ? 263 : 33)}
          borderWidth="1px"
          borderColor="gray.300"
          debounceTimeout={debounce}
          element={isTextarea ? (Textarea as React.FC) : (Input as React.FC)}
          onChange={(e) => handleChange(e)}
          inputRef={ref}
        />
      </WidgetWrapper>
    )
  }
)

export { InputWidget }
