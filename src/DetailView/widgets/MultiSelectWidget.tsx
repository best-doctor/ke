import * as React from 'react'

import type { ValueType } from 'react-select/src/types'

import { useWidgetInitialization } from '../../common/hooks/useWidgetInitialization'
import { AsyncSelectWidget } from '../../common/components/AsyncSelectWidget'
import { WidgetWrapper } from '../../common/components/WidgetWrapper'
import { pushAnalytics } from '../../integration/analytics'
import { EventNameEnum, WidgetTypeEnum } from '../../integration/analytics/firebase/enums'
import type { WidgetProps } from '../../typing'

type MultiSelectValue = {
  [key: string]: string
}

type RawWidgetPayload = (string | number | undefined)[]

type MultiSelectWidgetProps = WidgetProps & { optionLabel: Function; optionValue: Function }

const extractPayloadIds = (widgetValue: MultiSelectValue[] | undefined): string[] => {
  if (widgetValue) {
    return widgetValue.map((element: MultiSelectValue) => element.uuid || element.id)
  }

  return []
}

const MultiSelectWidget = (props: MultiSelectWidgetProps): JSX.Element => {
  const {
    name,
    optionLabel,
    optionValue,
    style,
    helpText,
    provider,
    setInitialValue,
    submitChange,
    containerStore,
  } = props

  const context = containerStore.getState()
  const { targetUrl, content, dataResourceUrl } = useWidgetInitialization({ ...props, context })

  const [value, setValue] = React.useState<MultiSelectValue[]>(content as MultiSelectValue[])
  setInitialValue({ [name]: extractPayloadIds(value) })

  const handleChange = (changeValue: ValueType<MultiSelectValue[]>): void => {
    setValue(changeValue as MultiSelectValue[])

    let payloadIds: RawWidgetPayload = []

    if (changeValue) {
      payloadIds = extractPayloadIds(changeValue as MultiSelectValue[])
    }

    pushAnalytics({
      eventName: EventNameEnum.FOREIGN_KEY_SELECT_OPTION_CHANGE,
      widgetType: WidgetTypeEnum.INPUT,
      value: payloadIds,
      ...props,
    })

    submitChange({ url: targetUrl, payload: { [name]: payloadIds } })
  }

  return (
    <WidgetWrapper style={style} helpText={helpText}>
      <AsyncSelectWidget
        provider={provider}
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
