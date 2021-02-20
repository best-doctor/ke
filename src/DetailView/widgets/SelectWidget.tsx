import * as React from 'react'
import { useEffect, useState } from 'react'
import { Select } from '@chakra-ui/core'
import type { Store } from 'effector'

import { WidgetWrapper } from '../../common/components/WidgetWrapper'
import { getAccessor, getData, getPayload, getWidgetContent, applyCallback } from '../utils/dataAccess'
import { EventNameEnum, WidgetTypeEnum, pushAnalytics } from '../../integration/analytics'

import type { GenericAccessor, DetailObject, WidgetProps, Accessor, ValueOrPromise } from '../../typing'

type SelectObject = {
  value: string
  text: string
}

type SelectWidgetProps = {
  name: string
  mainDetailObject: DetailObject
  helpText?: string
  displayValue?: GenericAccessor
  data: Accessor<ValueOrPromise<SelectObject[]>>
  style: object
  setInitialValue: Function
  handleChange: Function
  containerStore: Store<object>
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
    displayValue,
    containerStore,
    mainDetailObject,
    dataSource,
    dataTarget,
    targetPayload,
    provider,
    setInitialValue,
    submitChange,
    cacheTime,
  } = props
  const targetUrl = getData(dataTarget, mainDetailObject) || mainDetailObject.url
  const context = containerStore.getState()
  const effectiveCacheTime = getAccessor(cacheTime, mainDetailObject, context)

  const [value] = getSelectContent(name, mainDetailObject, displayValue, 'object')

  setInitialValue({ [name]: value })

  const options = (): Promise<SelectObject[]> => {
    const sourceUrl = getData(dataSource, mainDetailObject, context)
    return provider
      .getPage(sourceUrl, undefined, undefined, effectiveCacheTime)
      .then(([responseOptions, ,]: [any, object, object]) => responseOptions as SelectObject[])
  }

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

  return <BaseSelectWidget data={options} handleChange={handleChange} {...props} />
}

const BaseSelectWidget = (props: SelectWidgetProps): JSX.Element => {
  const {
    name,
    helpText,
    displayValue,
    containerStore,
    mainDetailObject,
    data,
    style,
    setInitialValue,
    handleChange,
  } = props

  const context = containerStore.getState()

  const [value, text] = getSelectContent(name, mainDetailObject, displayValue, 'object')

  const [resultOptions, setResultOptions] = useState<SelectObject[]>([])
  setInitialValue({ [name]: value })

  useEffect(() => {
    const responseOptions = getAccessor(data, mainDetailObject, context)
    return applyCallback(responseOptions, setResultOptions)
  }, [data, mainDetailObject, context])

  return (
    <WidgetWrapper name={name} style={style} helpText={helpText}>
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

export { SelectWidget, BaseSelectWidget }
