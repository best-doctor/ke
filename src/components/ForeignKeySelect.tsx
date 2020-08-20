import * as React from 'react'

import { AsyncSelectWidget } from './AsyncSelectWidget'
import { WidgetWrapper } from './WidgetWrapper'
import { EventNameEnum, WidgetTypeEnum } from '../integration/analytics/firebase/enums'
import { pushAnalytics } from '../integration/analytics'
import { getData, getWidgetContent } from '../utils/dataAccess'
import type { BaseProvider } from '../admin/providers'
import type { BaseAnalytic } from '../integration/analytics'
import type { BaseNotifier } from '../utils/notifier'

type ForeignKeySelectWidgetProps = {
  name: string
  detailObject: any
  resource: string
  provider: BaseProvider
  useLocalStorage?: boolean | undefined
  helpText: string
  displayValue: string | Function
  targetPayload: Function
  dataSource: string
  dataTarget: string | Function
  optionLabel: Function
  optionValue: Function
  setObject: Function
  notifier: BaseNotifier
  analytics: BaseAnalytic | undefined
  viewType: string
  widgetAnalytics: Function | boolean | undefined
  style: object
  setInitialValue: Function
  submitChange: Function
}

const ForeignKeySelectWidget = (props: ForeignKeySelectWidgetProps): JSX.Element => {
  const {
    name,
    detailObject,
    provider,
    helpText,
    displayValue,
    dataSource,
    dataTarget,
    targetPayload,
    optionLabel,
    optionValue,
    style,
    setInitialValue,
    submitChange,
  } = props

  const [value, setValue] = React.useState<object>(getWidgetContent(name, detailObject, displayValue, 'object'))
  setInitialValue({ [name]: value })

  const targetUrl = getData(dataTarget, detailObject) || detailObject.url

  const handleChange = (changeValue: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(changeValue)

    pushAnalytics({
      eventName: EventNameEnum.FOREIGN_KEY_SELECT_OPTION_CHANGE,
      widgetType: WidgetTypeEnum.INPUT,
      value: changeValue,
      ...props,
    })

    const widgetPayload = targetPayload(changeValue)
    submitChange({ url: targetUrl, payload: widgetPayload })
  }

  return (
    <WidgetWrapper style={style} helpText={helpText}>
      <AsyncSelectWidget
        provider={provider}
        dataResourceUrl={dataSource}
        handleChange={handleChange}
        value={value}
        isClearable
        getOptionLabel={optionLabel}
        getOptionValue={optionValue}
      />
    </WidgetWrapper>
  )
}

export { ForeignKeySelectWidget }
