/* eslint-disable react/jsx-props-no-spreading */
/* Это legacy */
import React from 'react'

import { CheckBox } from '@components/controls'
import { useWidgetInitialization } from '../../common/hooks/useWidgetInitialization'
import { WidgetWrapper } from '../../common/components/WidgetWrapper'
import { getAccessor, getPayload } from '../utils/dataAccess'
import { pushAnalytics, EventNameEnum, WidgetTypeEnum } from '../../integration/analytics'
import type { WidgetProps } from '../../typing'
import { useCreateTestId } from '../../django-spa/aspects/test-id/TestIdProvider'
import { Accessor } from '../../typing'

/**
 * Render input-checkbox for using in forms
 * Load "value" from props.dataSource and then get content via props.displayValue if exists
 * else get 'data'[props.name].
 * @param props - widget props
 */
const CheckboxWidget = (
  props: WidgetProps & { isDisabled?: Accessor<boolean>; isReadOnly?: Accessor<boolean> }
): JSX.Element => {
  const {
    name,
    helpText,
    targetPayload,
    submitChange,
    setInitialValue,
    containerStore,
    style: externalStyle,
    mainDetailObject,
    isDisabled = false,
    isReadOnly,
  } = props

  const context = containerStore?.getState()

  const { targetUrl, content, widgetDescription } = useWidgetInitialization({ ...props, context })
  const [value, setValue] = React.useState<boolean>(!!content)
  const disabled = getAccessor(isDisabled, mainDetailObject, context)

  setInitialValue({ [name]: content })

  const handleChange = (v: boolean): void => {
    setValue(v)

    pushAnalytics({
      eventName: EventNameEnum.INPUT_CHANGE,
      widgetType: WidgetTypeEnum.INPUT,
      value: v,
      objectForAnalytics: mainDetailObject,
      ...props,
    })

    const inputPayload = getPayload(v, name, targetPayload)

    submitChange({ url: targetUrl, payload: inputPayload })
  }

  const style = { pt: 4, ...externalStyle }
  const { getDataTestId } = useCreateTestId()

  return (
    <WidgetWrapper
      containerProps={{ mt: 0 }}
      name={name}
      style={style}
      description={widgetDescription}
      {...getDataTestId(props)}
    >
      <CheckBox
        isReadOnly={getAccessor(isReadOnly, mainDetailObject, context)}
        value={value}
        onChange={handleChange}
        helpText={helpText}
        isDisabled={disabled}
        name={name}
      />
    </WidgetWrapper>
  )
}

export { CheckboxWidget }
