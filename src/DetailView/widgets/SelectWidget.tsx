import * as React from 'react'
import { useEffect, useState } from 'react'
import { Select } from '@chakra-ui/core'

import { WidgetWrapper } from '../../common/components/WidgetWrapper'
import { getData, getPayload, getWidgetContent } from '../utils/dataAccess'
import { EventNameEnum, WidgetTypeEnum, pushAnalytics } from '../../integration/analytics'

import type { GenericAccessor, DetailObject, WidgetProps } from '../../typing'

type SelectObject = {
  value: string
  text: string
}

const getSelectContent = (
  name: string,
  detailObject: DetailObject,
  displayValue: GenericAccessor,
  expectedType: string
): [string, string] => {
  // TODO Remove this
  try {
    const { value, text } = getWidgetContent(name, detailObject, displayValue, expectedType)
    return [value, text]
  } catch (TypeError) {
    return ['', '']
  }
}

const SelectWidget = (props: WidgetProps): JSX.Element => {
  const {
    name,
    helpText,
    displayValue,
    mainDetailObject,
    dataSource,
    dataTarget,
    targetPayload,
    provider,
    style,
    setInitialValue,
    submitChange,
  } = props
  const sourceUrl = getData(dataSource, mainDetailObject)
  const targetUrl = getData(dataTarget, mainDetailObject) || mainDetailObject.url

  const [value, text] = getSelectContent(name, mainDetailObject, displayValue, 'object')

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
      objectForAnalytics: props.mainDetailObject,
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
