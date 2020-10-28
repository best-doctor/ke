import * as React from 'react'
import { DebounceInput } from 'react-debounce-input'
import { Textarea, Input } from '@chakra-ui/core'

import { useWidgetInitialization } from '../../common/hooks/useWidgetInitialization'
import { WidgetWrapper } from '../../common/components/WidgetWrapper'
import { getPayload } from '../utils/dataAccess'
import { EventNameEnum, WidgetTypeEnum } from '../../integration/analytics/firebase/enums'
import { pushAnalytics } from '../../integration/analytics'

import type { WidgetProps } from '../../typing'

type InputWidgetProps = WidgetProps & { isTextarea?: boolean }

const InputWidget = (props: InputWidgetProps): JSX.Element => {
  const {
    name,
    helpText,
    targetPayload,
    style,
    submitChange,
    setInitialValue,
    containerStore,
    isTextarea = true,
  } = props

  const context = containerStore.getState()

  const { targetUrl, content } = useWidgetInitialization({ ...props, context })

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

  return (
    <WidgetWrapper style={style} helpText={helpText}>
      <DebounceInput
        value={content as string}
        resize="none"
        height={isTextarea ? 263 : 33}
        borderWidth="1px"
        borderColor="gray.300"
        debounceTimeout={1000}
        element={isTextarea ? (Textarea as React.FC) : (Input as React.FC)}
        onChange={(e) => handleChange(e)}
      />
    </WidgetWrapper>
  )
}

export { InputWidget }
