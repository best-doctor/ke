import React from 'react'

import { PhoneChipInput } from '../../django-spa/Controls'
import { WidgetWrapper } from '../../common/components/WidgetWrapper'
import { EventNameEnum, pushAnalytics, WidgetTypeEnum } from '../../integration/analytics'
import { useWidgetInitialization } from '../../common/hooks/useWidgetInitialization'
import { WidgetProps } from '../../typing'
import { getPayload } from '../utils/dataAccess'
import { useTestId } from '../../django-spa/aspects/test-id'

interface PhoneChipInputWidgetProps extends WidgetProps {
  chipClassName?: string
  inputClassName?: string
}

export const PhoneChipInputWidget = (props: PhoneChipInputWidgetProps): JSX.Element => {
  const {
    name,
    helpText,
    description,
    targetPayload,
    style,
    submitChange,
    setInitialValue,
    containerStore,
    containerProps,
    labelContainerProps,
    chipClassName,
    inputClassName,
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

  const dataTestId = useTestId(props)

  return (
    <WidgetWrapper
      data-test-id={dataTestId}
      name={name}
      style={style}
      helpText={helpText}
      description={description}
      required={isRequired}
      containerProps={containerProps}
      labelContainerProps={labelContainerProps}
    >
      <PhoneChipInput
        chipClassName={chipClassName}
        inputClassName={inputClassName}
        value={(content || []) as string[]}
        onChange={handleChange}
      />
    </WidgetWrapper>
  )
}
