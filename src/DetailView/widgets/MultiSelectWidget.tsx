import React from 'react'

import type { ValueType } from 'react-select'

import { useWidgetInitialization } from '../../common/hooks/useWidgetInitialization'
import { AsyncSelectWidget } from '../../common/components/AsyncSelectWidget'
import { WidgetWrapper } from '../../common/components/WidgetWrapper'
import { pushAnalytics, EventNameEnum, WidgetTypeEnum } from '../../integration/analytics'
import type { WidgetProps } from '../../typing'
import { getAccessor, getPayload } from '../utils/dataAccess'

type MultiSelectValue = {
  [key: string]: string
}

type MultiSelectWidgetProps = WidgetProps & { optionLabel: Function; optionValue: Function }

const MultiSelectWidget = (props: MultiSelectWidgetProps): JSX.Element => {
  const {
    name,
    mainDetailObject,
    optionLabel,
    optionValue,
    style,
    helpText,
    description,
    provider,
    setInitialValue,
    submitChange,
    containerStore,
    cacheTime,
    targetPayload,
  } = props

  const context = containerStore.getState()
  const { targetUrl, content, dataResourceUrl } = useWidgetInitialization({ ...props, context })
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
      objectForAnalytics: props.mainDetailObject,
      ...props,
    })

    submitChange({ url: targetUrl, payload: widgetPayload })
  }

  React.useMemo(() => {
    setValue(content as object[] | null)
  }, [content])

  return (
    <WidgetWrapper name={name} style={style} helpText={helpText} description={description}>
      <AsyncSelectWidget
        provider={provider}
        cacheTime={effectiveCacheTime}
        dataResourceUrl={dataResourceUrl}
        handleChange={handleChange}
        closeMenuOnSelect={false}
        value={value}
        isMulti
        getOptionLabel={optionLabel}
        getOptionValue={optionValue}
      />
    </WidgetWrapper>
  )
}

export { MultiSelectWidget }
