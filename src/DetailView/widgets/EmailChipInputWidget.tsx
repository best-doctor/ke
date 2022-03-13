// Это обёртка
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react'
import { useStore } from 'effector-react'

import { EmailChipInput } from '@components/controls'
import { WidgetWrapper } from '../../common/components/WidgetWrapper'
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
  } = props
  const context = useStore(containerStore)

  const { targetUrl, content, isRequired, widgetDescription } = useWidgetInitialization({ ...props, context })

  useEffect(() => {
    setInitialValue({ [name]: content })
  }, [setInitialValue, name, content])

  const handleChange = (newChips: string[]): void => {
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
