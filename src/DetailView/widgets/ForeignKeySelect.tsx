import * as React from 'react'

import { ValidationWrapper } from '../../common/components/ValidationWrapper'
import { AsyncSelectWidget } from '../../common/components/AsyncSelectWidget'
import { WidgetWrapper } from '../../common/components/WidgetWrapper'
import { EventNameEnum, WidgetTypeEnum } from '../../integration/analytics/firebase/enums'
import { pushAnalytics } from '../../integration/analytics'
import { getData, getWidgetContent } from '../utils/dataAccess'
import type { BaseProvider } from '../../admin/providers'
import type { BaseAnalytic } from '../../integration/analytics'
import type { BaseNotifier } from '../../common/notifier'

type ForeignKeySelectWidgetProps = {
  name: string
  detailObject: { [key: string]: object | string }
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
  notBlockingValidators?: Function[]
  blockingValidators?: Function[]
  containerStore: { getState: Function }
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
    notBlockingValidators = [],
    blockingValidators = [],
    containerStore,
  } = props

  const [value, setValue] = React.useState<object>(getWidgetContent(name, detailObject, displayValue, 'object'))
  const dataResourceUrl = getData(dataSource, containerStore.getState())

  setInitialValue(value ? targetPayload(value) : null)

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
      <ValidationWrapper
        notBlockingValidators={notBlockingValidators}
        blockingValidators={blockingValidators}
        provider={provider}
        detailObject={detailObject}
      >
        <AsyncSelectWidget
          provider={provider}
          dataResourceUrl={dataResourceUrl}
          handleChange={handleChange}
          value={value}
          isClearable
          getOptionLabel={optionLabel}
          getOptionValue={optionValue}
        />
      </ValidationWrapper>
    </WidgetWrapper>
  )
}

export { ForeignKeySelectWidget }
