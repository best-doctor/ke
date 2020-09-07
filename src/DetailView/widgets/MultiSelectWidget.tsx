import * as React from 'react'

import type { ValueType } from 'react-select/src/types'

import type { BaseProvider } from 'index'
import { AsyncSelectWidget } from '../../common/components/AsyncSelectWidget'
import { WidgetWrapper } from '../../common/components/WidgetWrapper'
import { pushAnalytics } from '../../integration/analytics'
import { EventNameEnum, WidgetTypeEnum } from '../../integration/analytics/firebase/enums'
import { getWidgetContent } from '../utils/dataAccess'

import type { BaseAnalytic } from '../../integration/analytics'
import type { BaseNotifier } from '../../common/notifier'
import type { GenericAccessor } from '../../typing'

type MultiSelectWidgetProps = {
  name: string
  resource: string
  detailObject: object
  helpText: string
  setObject: Function
  displayValue: GenericAccessor
  dataSource: string
  dataTarget: GenericAccessor
  targetPayload: GenericAccessor
  provider: BaseProvider
  analytics: BaseAnalytic | undefined
  widgetAnalytics: Function | boolean | undefined
  notifier: BaseNotifier
  optionLabel: Function
  optionValue: Function
  viewType: string
  style: object
  setInitialValue: Function
  submitChange: Function
}

type MultiSelectValue = {
  [key: string]: string
}

type RawWidgetPayload = (string | number | undefined)[]

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
    detailObject,
    displayValue,
    provider,
    dataSource,
    setInitialValue,
    submitChange,
  } = props

  const [value, setValue] = React.useState<MultiSelectValue[]>(
    getWidgetContent(name, detailObject, displayValue, 'object')
  )
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

    submitChange({ url: '', payload: { [name]: payloadIds } })
  }

  return (
    <WidgetWrapper style={style} helpText={helpText}>
      <AsyncSelectWidget
        provider={provider}
        dataResourceUrl={dataSource}
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
