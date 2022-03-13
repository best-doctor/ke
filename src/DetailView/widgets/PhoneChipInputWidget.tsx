// Это легаси
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react'
import { useStore } from 'effector-react'

import { PhoneChipInput } from '@components/controls'
import { useCreateTestId } from '@aspects/test-id/TestIdProvider'
import { WidgetWrapper } from '../../common/components/WidgetWrapper'
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
