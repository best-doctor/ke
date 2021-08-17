import React from 'react'

import { EmailChipInput } from '../../django-spa/Controls'
import { WidgetWrapper } from '../../common/components/WidgetWrapper'
import { EventNameEnum, pushAnalytics, WidgetTypeEnum } from '../../integration/analytics'
import { useWidgetInitialization } from '../../common/hooks/useWidgetInitialization'
import { WidgetProps } from '../../typing'
import { getPayload } from '../utils/dataAccess'

export const EmailChipInputWidget = (props: WidgetProps): JSX.Element => {
  const {
    name,
    helpText,
    description,
    targetPayload,
    style,
    submitChange,
    setInitialValue,
    containerStore,
    labelContainerProps,
    containerProps,
  } = props
  const context = containerStore.getState()

  const { targetUrl, content, isRequired } = useWidgetInitialization({ ...props, context })

  setInitialValue({ [name]: content })

  const handleChange = (newChips: string[]): void => {
    pushAnalytics({
      eventName: EventNameEnum.INPUT_CHANGE,
      widgetType: WidgetTypeEnum.INPUT,
      value: newChips,
      objectForAnalytics: props.mainDetailObject,
      ...props,
    })

    const inputPayload = getPayload(newChips, name, targetPayload)
    submitChange({ url: targetUrl, payload: inputPayload })
  }

  return (
    <WidgetWrapper
      containerProps={containerProps}
      labelContainerProps={labelContainerProps}
      name={name}
      style={style}
      helpText={helpText}
      description={description}
      required={isRequired}
    >
      <EmailChipInput value={(content || []) as string[]} onChange={handleChange} />
    </WidgetWrapper>
  )
}
