import * as React from 'react'
import { DebounceInput } from 'react-debounce-input'
import { Textarea } from '@chakra-ui/core'
import { WidgetWrapper } from '../../components/WidgetWrapper'
import { getData, getWidgetContent, getPayload } from '../utils/dataAccess'
import { EventNameEnum, WidgetTypeEnum } from '../../integration/analytics/firebase/enums'
import { pushAnalytics } from '../../integration/analytics'

import type { BaseProvider } from '../../admin/providers'
import type { GenericAccessor } from '../../typing'
import type { BaseAnalytic } from '../../integration/analytics/base'
import type { BaseNotifier } from '../../utils/notifier'

type InputWidgetProps = {
  name: string
  helpText: string
  resource: string
  detailObject: any
  useLocalStorage?: boolean | undefined
  analytics: BaseAnalytic | undefined
  widgetAnalytics: Function | boolean | undefined
  displayValue: GenericAccessor
  dataTarget: GenericAccessor
  targetPayload: GenericAccessor
  setObject: Function
  notifier: BaseNotifier
  provider: BaseProvider
  viewType: string
  style: object
  setInitialValue: Function
  submitChange: Function
}

const InputWidget = (props: InputWidgetProps): JSX.Element => {
  const {
    name,
    helpText,
    detailObject,
    displayValue,
    dataTarget,
    targetPayload,
    style,
    submitChange,
    setInitialValue,
  } = props
  const targetUrl = getData(dataTarget, detailObject) || detailObject.url
  const content = getWidgetContent(name, detailObject, displayValue)
  setInitialValue({ [name]: content })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    pushAnalytics({ eventName: EventNameEnum.INPUT_CHANGE, widgetType: WidgetTypeEnum.INPUT, value: e, ...props })

    const inputPayload = getPayload(e.target.value, name, targetPayload)
    submitChange({ url: targetUrl, payload: inputPayload })
  }

  return (
    <WidgetWrapper style={style} helpText={helpText}>
      <DebounceInput
        value={content}
        resize="none"
        height={263}
        borderWidth="2px"
        borderColor="gray.300"
        debounceTimeout={1000}
        element={Textarea as React.FC}
        onChange={(e) => handleChange(e)}
      />
    </WidgetWrapper>
  )
}

export { InputWidget }
