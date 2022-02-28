// Это легаси
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'

import type { ValueType } from 'react-select'

import { useWidgetInitialization } from '../../common/hooks/useWidgetInitialization'
import { AsyncSelectWidget } from '../../common/components/AsyncSelectWidget'
import { WidgetWrapper } from '../../common/components/WidgetWrapper'
import { pushAnalytics, EventNameEnum, WidgetTypeEnum } from '../../integration/analytics'
import type { Accessor, DetailObject, WidgetProps } from '../../typing'
import { getAccessor, getPayload } from '../utils/dataAccess'
import { ExtendedProps } from '../../common/components/ReactSelectCustomization'
import { useCreateTestId } from '../../django-spa/aspects'

type MultiSelectValue = {
  [key: string]: string
}

export type MultiSelectWidgetProps = WidgetProps & {
  optionLabel: Function
  optionValue: Function
  optionLabelMenu?: (option: unknown, mainObject: DetailObject) => string
  optionLabelValue?: (option: unknown, mainObject: DetailObject) => string
  staleTime?: Accessor<number>
} & ExtendedProps

const MultiSelectWidget = (props: MultiSelectWidgetProps): JSX.Element => {
  const {
    name,
    mainDetailObject,
    optionLabel,
    optionValue,
    style,
    helpText,
    provider,
    setInitialValue,
    submitChange,
    containerStore,
    cacheTime,
    targetPayload,
    optionLabelMenu,
    optionLabelValue,
    staleTime,
    componentsClasses,
  } = props

  const context = containerStore.getState()
  const { targetUrl, content, dataResourceUrl, isRequired, widgetDescription } = useWidgetInitialization({
    ...props,
    context,
  })
  const effectiveCacheTime = getAccessor(cacheTime, mainDetailObject, context)

  const [value, setValue] = React.useState<object[] | null>(content as object[] | null)
  setInitialValue(value ? getPayload(value, name, targetPayload) : null)

  const handleChange = (changeValue: ValueType<MultiSelectValue, true>): void => {
    setValue(changeValue as MultiSelectValue[])

    const widgetPayload = getPayload(changeValue, name, targetPayload)

    pushAnalytics({
      eventName: EventNameEnum.FOREIGN_KEY_SELECT_OPTION_CHANGE,
      widgetType: WidgetTypeEnum.INPUT,
      value: widgetPayload,
      objectForAnalytics: mainDetailObject,
      ...props,
    })

    submitChange({ url: targetUrl, payload: widgetPayload })
  }

  React.useMemo(() => {
    setValue(content as object[] | null)
  }, [content])

  const { getDataTestId } = useCreateTestId()

  return (
    <WidgetWrapper
      name={name}
      style={style}
      helpText={helpText}
      description={widgetDescription}
      required={isRequired}
      {...getDataTestId(props)}
    >
      <AsyncSelectWidget
        provider={provider}
        cacheTime={effectiveCacheTime}
        dataResourceUrl={dataResourceUrl}
        handleChange={handleChange}
        closeMenuOnSelect={false}
        value={value}
        isMulti
        getOptionLabel={(val: object | null) => optionLabel(val, mainDetailObject)}
        getOptionValue={optionValue}
        getOptionLabelMenu={
          optionLabelMenu ? (val: object | null) => optionLabelMenu(val, mainDetailObject) : undefined
        }
        getOptionLabelValue={
          optionLabelValue ? (val: object | null) => optionLabelValue(val, mainDetailObject) : undefined
        }
        staleTime={staleTime}
        componentsClasses={componentsClasses}
      />
    </WidgetWrapper>
  )
}

export { MultiSelectWidget }
