import React, { forwardRef, useEffect, useState } from 'react'
import Select, { ValueType } from 'react-select'
import type { Store } from 'effector'

import { WidgetWrapper } from '../../common/components/WidgetWrapper'
import {
  getAccessor,
  getData,
  getPayload,
  getWidgetContent,
  applyCallback,
  getAccessorWithDefault,
} from '../utils/dataAccess'
import { EventNameEnum, WidgetTypeEnum, pushAnalytics } from '../../integration/analytics'

import type { GenericAccessor, DetailObject, WidgetProps, Accessor, ValueOrPromise } from '../../typing'

export type SelectObject = {
  value: string
  text: string
}

type SelectWidgetProps = {
  name: string
  mainDetailObject: DetailObject
  helpText?: string
  description?: string | JSX.Element
  displayValue?: GenericAccessor
  data: Accessor<ValueOrPromise<SelectObject[]>>
  style: object
  setInitialValue: Function
  handleChange: Function
  containerStore: Store<object>
  required?: Accessor<boolean>
  isDisabled?: boolean
}

const getSelectContent = (
  name: string,
  detailObject: DetailObject,
  displayValue: GenericAccessor,
  context: {}
): [string, string] => {
  // TODO Remove this
  try {
    const { value, text } = getWidgetContent(name, detailObject, displayValue, context)
    return [value, text]
  } catch (TypeError) {
    return ['', '']
  }
}

const BaseSelectWidget = forwardRef<HTMLSelectElement, SelectWidgetProps>(
  (props: SelectWidgetProps, ref): JSX.Element => {
    const {
      name,
      helpText,
      description,
      displayValue,
      containerStore,
      mainDetailObject,
      data,
      style,
      setInitialValue,
      handleChange,
      required,
      isDisabled = false,
    } = props

    const context = containerStore.getState()

    const [value, label] = getSelectContent(name, mainDetailObject, displayValue, context)
    const isRequired = getAccessorWithDefault(required, mainDetailObject, context, false)

    const [resultOptions, setResultOptions] = useState<SelectObject[]>([])
    setInitialValue({ [name]: value })

    const widgetStyles = {
      menuPortal: (base: object) => ({ ...base, zIndex: 9999 }),
    }

    useEffect(() => {
      const responseOptions = getAccessor(data, mainDetailObject, context)
      return applyCallback(responseOptions, setResultOptions)
    }, [data, mainDetailObject, context])

    const formatOption = (option: { value: any; label?: string; text?: string }): { value: any; label: string } => ({
      value: option.value,
      label: option?.label || option?.text || '',
    })

    const options = React.useMemo(() => resultOptions.map((option) => formatOption(option)), [resultOptions])

    return (
      <WidgetWrapper name={name} style={style} helpText={helpText} description={description} required={isRequired}>
        <Select
          inputRef={ref}
          options={options}
          defaultValue={{ value, label }}
          onChange={(changeValue: ValueType<object | object[], boolean>) => handleChange(changeValue)}
          styles={widgetStyles}
          isDisabled={isDisabled}
        />
      </WidgetWrapper>
    )
  }
)

const SelectWidget = forwardRef<HTMLSelectElement, WidgetProps>(
  (props: WidgetProps, ref): JSX.Element => {
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

    const [value] = getSelectContent(name, mainDetailObject, displayValue, context)

    setInitialValue({ [name]: value })

    const options = (): Promise<SelectObject[]> => {
      const sourceUrl = getData(dataSource, mainDetailObject, context)
      return provider
        .getPage(sourceUrl, undefined, undefined, effectiveCacheTime)
        .then(([responseOptions, ,]: [any, object, object]) => responseOptions as SelectObject[])
    }

    const handleChange = (changeValue: SelectObject): void => {
      const widgetPayload = getPayload(changeValue.value, name, targetPayload)

      pushAnalytics({
        eventName: EventNameEnum.SELECT_OPTION_CHANGE,
        widgetType: WidgetTypeEnum.INPUT,
        value: changeValue,
        objectForAnalytics: props.mainDetailObject,
        ...props,
      })

      submitChange({ url: targetUrl, payload: widgetPayload })
    }

    return <BaseSelectWidget ref={ref} data={options} handleChange={handleChange} {...props} />
  }
)

export { SelectWidget, BaseSelectWidget }
