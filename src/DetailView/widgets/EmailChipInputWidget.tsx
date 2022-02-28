// Это обёртка
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'

import { EmailChipInput } from '@components/controls'
import { WidgetWrapper } from '../../common/components/WidgetWrapper'
import { EventNameEnum, pushAnalytics, WidgetTypeEnum } from '../../integration/analytics'
import { useWidgetInitialization } from '../../common/hooks/useWidgetInitialization'
import { WidgetProps } from '../../typing'
import { getPayload } from '../utils/dataAccess'
import { useCreateTestId } from '../../django-spa/aspects'

interface EmailChipInputWidgetProps extends WidgetProps {
  chipClassName?: string
  inputClassName?: string
}

export const EmailChipInputWidget = (props: EmailChipInputWidgetProps): JSX.Element => {
  const {
    name,
    helpText,
    targetPayload,
    style,
    submitChange,
    setInitialValue,
    containerStore,
    labelContainerProps,
    containerProps,
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
      containerProps={containerProps}
      labelContainerProps={labelContainerProps}
      name={name}
      style={style}
      helpText={helpText}
      description={widgetDescription}
      required={isRequired}
      {...getDataTestId(props)}
    >
      <EmailChipInput
        chipClassName={chipClassName}
        inputClassName={inputClassName}
        value={(content || []) as string[]}
        onChange={handleChange}
      />
    </WidgetWrapper>
  )
}
