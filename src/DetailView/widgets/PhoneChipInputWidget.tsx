// Это легаси
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'

import { PhoneChipInput } from '@components/controls'
import { useCreateTestId } from '@aspects/test-id/TestIdProvider'
import { WidgetWrapper } from '../../common/components/WidgetWrapper'
import { EventNameEnum, pushAnalytics, WidgetTypeEnum } from '../../integration/analytics'
import { useWidgetInitialization } from '../../common/hooks/useWidgetInitialization'
import { WidgetProps } from '../../typing'
import { getPayload } from '../utils/dataAccess'

interface PhoneChipInputWidgetProps extends WidgetProps {
  chipClassName?: string
  inputClassName?: string
}

export const PhoneChipInputWidget = (props: PhoneChipInputWidgetProps): JSX.Element => {
  const {
    name,
    helpText,
    targetPayload,
    style,
    submitChange,
    setInitialValue,
    containerStore,
    containerProps,
    labelContainerProps,
    chipClassName,
    inputClassName,
    mainDetailObject,
  } = props
  const context = containerStore.getState()

  const { targetUrl, content, isRequired, widgetDescription } = useWidgetInitialization({ ...props, context })

  setInitialValue({ [name]: content })

  const handleChange = (newChips: string[]): void => {
    pushAnalytics({
      eventName: EventNameEnum.INPUT_CHANGE,
      widgetType: WidgetTypeEnum.INPUT,
      value: newChips,
      objectForAnalytics: mainDetailObject,
      ...props,
    })

    const inputPayload = getPayload(newChips, name, targetPayload)
    submitChange({ url: targetUrl, payload: inputPayload })
  }

  const { getDataTestId } = useCreateTestId()

  return (
    <WidgetWrapper
      name={name}
      style={style}
      helpText={helpText}
      description={widgetDescription}
      required={isRequired}
      containerProps={containerProps}
      labelContainerProps={labelContainerProps}
      {...getDataTestId(props)}
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
