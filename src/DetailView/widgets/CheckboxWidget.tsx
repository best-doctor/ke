import React from 'react'

import { CheckBox } from '@components/controls'
import { useWidgetInitialization } from '../../common/hooks/useWidgetInitialization'
import { WidgetWrapper } from '../../common/components/WidgetWrapper'
import { getPayload } from '../utils/dataAccess'
import { EventNameEnum, WidgetTypeEnum } from '../../integration/analytics/firebase/enums'
import { pushAnalytics } from '../../integration/analytics'

import type { WidgetProps } from '../../typing'
import { useCreateTestId } from '../../django-spa/aspects/test-id/TestIdProvider'

/**
 * Render input-checkbox for using in forms
 * Load "value" from props.dataSource and then get content via props.displayValue if exists
 * else get 'data'[props.name].
 * @param props - widget props
 */
const CheckboxWidget = (props: WidgetProps): JSX.Element => {
  const { name, helpText, targetPayload, submitChange, setInitialValue, containerStore, style: externalStyle } = props

  const context = containerStore.getState()

  const { targetUrl, content, widgetDescription } = useWidgetInitialization({ ...props, context })
  const [value, setValue] = React.useState<boolean>(!!content)

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
      <CheckBox value={value} onChange={handleChange} helpText={helpText} />
    </WidgetWrapper>
  )
}

export { CheckboxWidget }
