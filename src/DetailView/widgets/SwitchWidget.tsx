import React, { useState } from 'react'

import { Switch } from '../../django-spa/Controls'
import { useWidgetInitialization } from '../../common/hooks/useWidgetInitialization'
import { WidgetWrapper } from '../../common/components/WidgetWrapper'
import { getPayload } from '../utils/dataAccess'
import { EventNameEnum, WidgetTypeEnum } from '../../integration/analytics/firebase/enums'
import { pushAnalytics } from '../../integration/analytics'

import type { WidgetProps } from '../../typing'
import { useCreateTestId } from '../../django-spa/aspects'

/**
 * Render input-switch for using in forms
 * Load "value" from props.dataSource and then get content via props.displayValue if exists
 * else get 'data'[props.name].
 * @param props - widget props
 */
const SwitchWidget = (props: WidgetProps): JSX.Element => {
  const { name, helpText, description, targetPayload, submitChange, setInitialValue, containerStore, style } = props

  const context = containerStore.getState()

  const { targetUrl, content } = useWidgetInitialization({ ...props, context })
  const [value, setValue] = useState<boolean>(!!content)

  setInitialValue({ [name]: content })

  const handleChange = (v: boolean): void => {
    setValue(v)

    pushAnalytics({
      eventName: EventNameEnum.INPUT_CHANGE,
      widgetType: WidgetTypeEnum.INPUT,
      value: v,
      objectForAnalytics: props.mainDetailObject,
      ...props,
    })

    const inputPayload = getPayload(v, name, targetPayload)

    submitChange({ url: targetUrl, payload: inputPayload })
  }

  const { getDataTestId } = useCreateTestId()
  return (
    <WidgetWrapper
      containerProps={{ mt: 0 }}
      name={name}
      style={{ pt: 4, ...style }}
      description={description}
      {...getDataTestId(props)}
    >
      <Switch value={value} onChange={handleChange} helpText={helpText} />
    </WidgetWrapper>
  )
}

export { SwitchWidget }
