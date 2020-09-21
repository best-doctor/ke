import * as React from 'react'

import type { WidgetProps } from 'typing'

import { useWidgetInitialization } from '../../common/hooks/useWidgetInitialization'
import { ValidationWrapper } from '../../common/components/ValidationWrapper'
import { AsyncSelectWidget } from '../../common/components/AsyncSelectWidget'
import { WidgetWrapper } from '../../common/components/WidgetWrapper'
import { EventNameEnum, WidgetTypeEnum } from '../../integration/analytics/firebase/enums'
import { pushAnalytics } from '../../integration/analytics'
import { getPayload } from '../utils/dataAccess'

type ForeignKeySelectWidgetProps = WidgetProps & { optionLabel: Function; optionValue: Function }

const contentType = 'object'
const eventName = EventNameEnum.FOREIGN_KEY_SELECT_OPTION_CHANGE
const widgetType = WidgetTypeEnum.INPUT

const ForeignKeySelectWidget = (props: ForeignKeySelectWidgetProps): JSX.Element => {
  const {
    name,
    detailObject,
    provider,
    helpText,
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

  const context = containerStore.getState()

  const { targetUrl, content, dataResourceUrl } = useWidgetInitialization({ ...props, contentType, context })

  const [value, setValue] = React.useState<object>(content as object)

  setInitialValue(value ? getPayload(value, name, targetPayload) : null)

  const handleChangeValue = (changeValue: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(changeValue)

    pushAnalytics({
      eventName,
      widgetType,
      value: changeValue,
      ...props,
    })

    const widgetPayload = getPayload(changeValue, name, targetPayload)

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
          handleChange={handleChangeValue}
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
