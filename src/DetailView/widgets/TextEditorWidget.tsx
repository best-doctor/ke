import React from 'react'

import { useWidgetInitialization } from '../../common/hooks/useWidgetInitialization'
import { WidgetWrapper } from '../../common/components/WidgetWrapper'
import { getPayload } from '../utils/dataAccess'
import { EventNameEnum, WidgetTypeEnum } from '../../integration/analytics/firebase/enums'
import { pushAnalytics } from '../../integration/analytics'
import { TextEditor } from '../../django-spa/Controls'

import type { WidgetProps } from '../../typing'

type TextEditorProps = WidgetProps & {
  debounceValue?: number | undefined
}

const TextEditorWidget = (props: TextEditorProps): JSX.Element => {
  const { name, helpText, description, targetPayload, style, submitChange, setInitialValue, containerStore } = props

  const context = containerStore.getState()
  const { targetUrl, content, isRequired } = useWidgetInitialization({ ...props, context })

  setInitialValue({ [name]: content })

  const handleBlur = (value: string): void => {
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

  return (
    <WidgetWrapper name={name} style={style} helpText={helpText} description={description} required={isRequired}>
      <TextEditor value={content as string} onChange={handleBlur} />
    </WidgetWrapper>
  )
}

export { TextEditorWidget }
