import * as React from 'react'

import type { ValueType } from 'react-select/src/types'

import type { BaseProvider } from 'index'
import { AsyncSelectWidget } from './AsyncSelectWidget'
import { WidgetWrapper } from './WidgetWrapper'
import { pushAnalytics } from '../integration/analytics'
import { EventNameEnum, WidgetTypeEnum } from '../integration/analytics/firebase/enums'
import { WrappedLocalStorage } from '../store/localStorageWrapper'
import { getWidgetContent } from '../utils/dataAccess'

import type { BaseAnalytic } from '../integration/analytics'
import type { BaseNotifier } from '../utils/notifier'
import type { GenericAccessor } from '../typing'

type MultiSelectWidgetProps = {
  name: string
  resource: string
  detailObject: object
  useLocalStorage: boolean
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
}

type MultiSelectValue = {
  [key: string]: string
}

type RawWidgetPayload = (string | number | undefined)[]

const MultiSelectWidget = (props: MultiSelectWidgetProps): JSX.Element => {
  const {
    name,
    targetPayload,
    optionLabel,
    optionValue,
    style,
    helpText,
    detailObject,
    displayValue,
    provider,
    dataSource,
  } = props

  const [value, setValue] = React.useState<MultiSelectValue[]>(
    getWidgetContent(name, detailObject, displayValue, 'object')
  )

  const collectWidgetPayload = (changeValue: ValueType<MultiSelectValue[]>): [object, RawWidgetPayload] => {
    let payloadIds: RawWidgetPayload = []

    if (changeValue) {
      payloadIds = (changeValue as MultiSelectValue[]).map((element: MultiSelectValue) => element.uuid || element.id)
    }

    const widgetPayload = (targetPayload as Function)(payloadIds)
    return [widgetPayload, payloadIds]
  }

  const handleChange = (changeValue: ValueType<MultiSelectValue[]>): void => {
    setValue(changeValue as MultiSelectValue[])

    const [widgetPayload, rawPayload] = collectWidgetPayload(changeValue)

    pushAnalytics({
      eventName: EventNameEnum.FOREIGN_KEY_SELECT_OPTION_CHANGE,
      widgetType: WidgetTypeEnum.INPUT,
      value: rawPayload,
      ...props,
    })

    WrappedLocalStorage.setItem(name, widgetPayload)
  }

  return (
    <WidgetWrapper style={style} helpText={helpText}>
      <AsyncSelectWidget
        provider={provider}
        dataResourceUrl={dataSource}
        handleChange={handleChange}
        value={value}
        isMulti
        getOptionLabel={optionLabel}
        getOptionValue={optionValue}
      />
    </WidgetWrapper>
  )
}

export { MultiSelectWidget }
