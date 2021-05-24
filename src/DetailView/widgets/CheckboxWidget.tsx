import React from 'react'
import { Checkbox, Box } from '@chakra-ui/react'

import { useWidgetInitialization } from '../../common/hooks/useWidgetInitialization'
import { WidgetWrapper } from '../../common/components/WidgetWrapper'
import { getPayload } from '../utils/dataAccess'
import { EventNameEnum, WidgetTypeEnum } from '../../integration/analytics/firebase/enums'
import { pushAnalytics } from '../../integration/analytics'

import type { WidgetProps } from '../../typing'

/**
 * Render input-checkbox for using in forms
 * Load "value" from props.dataSource and then get content via props.displayValue if exists
 * else get 'data'[props.name].
 * @param props - widget props
 */
const CheckboxWidget = (props: WidgetProps): JSX.Element => {
  const { name, helpText, description, targetPayload, style, submitChange, setInitialValue, containerStore } = props

  const context = containerStore.getState()

  const { targetUrl, content } = useWidgetInitialization({ ...props, context })
  const [value, setValue] = React.useState<boolean>(!!content)

  setInitialValue({ [name]: content })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(e.target.checked)

    pushAnalytics({
      eventName: EventNameEnum.INPUT_CHANGE,
      widgetType: WidgetTypeEnum.INPUT,
      value: e.target.checked,
      objectForAnalytics: props.mainDetailObject,
      ...props,
    })

    const inputPayload = getPayload(e.target.checked, name, targetPayload)

    submitChange({ url: targetUrl, payload: inputPayload })
  }

  return (
    <WidgetWrapper name={name} style={style} helpText="&nbsp;" description={description}>
      <Box>
        <Checkbox isChecked={value} onChange={(e) => handleChange(e)}>
          {helpText}
        </Checkbox>
      </Box>
    </WidgetWrapper>
  )
}

export { CheckboxWidget }
