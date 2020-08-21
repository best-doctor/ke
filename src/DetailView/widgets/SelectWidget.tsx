import * as React from 'react'
import { useEffect, useState } from 'react'
import { Select } from '@chakra-ui/core'

import { WidgetWrapper } from '../../components/WidgetWrapper'
import { getData, getPayload, getWidgetContent } from '../utils/dataAccess'
import { EventNameEnum, WidgetTypeEnum, pushAnalytics } from '../../integration/analytics'

import type { BaseAnalytic } from '../../integration/analytics'
import type { BaseProvider } from '../../admin/providers'
import type { BaseNotifier } from '../../common/notifier'
import type { GenericAccessor } from '../../typing'

type SelectObject = {
  value: string
  text: string
}

type SelectProps = {
  name: string
  resource: string
  detailObject: any
  helpText: string
  setObject: Function
  displayValue: GenericAccessor
  dataSource: string | Function
  dataTarget: GenericAccessor
  targetPayload: GenericAccessor
  provider: BaseProvider
  analytics: BaseAnalytic | undefined
  widgetAnalytics: Function | boolean | undefined
  notifier: BaseNotifier
  viewType: string
  style: object
  setInitialValue: Function
  submitChange: Function
}

const SelectWidget = (props: SelectProps): JSX.Element => {
  const {
    name,
    helpText,
    displayValue,
    detailObject,
    dataSource,
    dataTarget,
    targetPayload,
    provider,
    style,
    setInitialValue,
    submitChange,
  } = props
  const sourceUrl = getData(dataSource, detailObject)
  const targetUrl = getData(dataTarget, detailObject) || detailObject.url

  const { value, text } = getWidgetContent(name, detailObject, displayValue, 'object')
  const [resultOptions, setResultOptions] = useState<SelectObject[]>([])
  setInitialValue({ [name]: value })

  useEffect(() => {
    provider.getList(sourceUrl).then(([responseOptions, ,]: [any, object, object]) => setResultOptions(responseOptions))
  }, [provider, sourceUrl])

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const widgetPayload = getPayload(e.target.value, name, targetPayload)

    pushAnalytics({
      eventName: EventNameEnum.SELECT_OPTION_CHANGE,
      widgetType: WidgetTypeEnum.INPUT,
      value: e,
      ...props,
    })

    submitChange({ url: targetUrl, payload: widgetPayload })
  }

  return (
    <WidgetWrapper style={style} helpText={helpText}>
      <Select name={name} onChange={(e) => handleChange(e)}>
        <option value={value} selected key={value}>
          {text}
        </option>
        {resultOptions
          .filter((element) => element.value !== value)
          .map((resultOption) => (
            <option value={resultOption.value} key={resultOption.value}>
              {resultOption.text}
            </option>
          ))}
      </Select>
    </WidgetWrapper>
  )
}

export { SelectWidget }
