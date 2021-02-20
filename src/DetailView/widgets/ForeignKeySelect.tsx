import * as React from 'react'

import type { WidgetProps } from 'typing'

import { useWidgetInitialization } from '../../common/hooks/useWidgetInitialization'
import { ValidationWrapper } from '../../common/components/ValidationWrapper'
import { AsyncSelectWidget } from '../../common/components/AsyncSelectWidget'
import { WidgetWrapper } from '../../common/components/WidgetWrapper'
import { EventNameEnum, WidgetTypeEnum } from '../../integration/analytics/firebase/enums'
import { pushAnalytics } from '../../integration/analytics'
import { getAccessor, getCopyHandler, getPayload } from '../utils/dataAccess'

type ForeignKeySelectWidgetProps = WidgetProps & {
  optionLabel: Function
  optionValue: Function
  isClearable?: boolean
  defaultOptions?: boolean
  searchParamName?: string
}

const eventName = EventNameEnum.FOREIGN_KEY_SELECT_OPTION_CHANGE
const widgetType = WidgetTypeEnum.INPUT

const ForeignKeySelectWidget = (props: ForeignKeySelectWidgetProps): JSX.Element => {
  const {
    name,
    mainDetailObject,
    provider,
    helpText,
    targetPayload,
    optionLabel,
    optionValue,
    isClearable = false,
    defaultOptions = false,
    style,
    setInitialValue,
    submitChange,
    notBlockingValidators = [],
    blockingValidators = [],
    containerStore,
    useClipboard,
    copyValue,
    searchParamName,
    notifier,
    cacheTime,
  } = props

  const context = containerStore.getState()

  const { targetUrl, content, dataResourceUrl } = useWidgetInitialization({ ...props, context })
  const effectiveCacheTime = getAccessor(cacheTime, mainDetailObject, context)

  const [value, setValue] = React.useState<object | null>(content as object | null)

  setInitialValue(value ? getPayload(value, name, targetPayload) : null)

  const handleChangeValue = (changeValue: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(changeValue)

    pushAnalytics({
      eventName,
      widgetType,
      value: changeValue,
      objectForAnalytics: props.mainDetailObject,
      ...props,
    })

    const widgetPayload = getPayload(changeValue, name, targetPayload)

    submitChange({ url: targetUrl, payload: widgetPayload })
  }

  const handleCopyValue = getCopyHandler(value, copyValue, () => optionLabel(value))

  return (
    <WidgetWrapper
      name={name}
      style={style}
      helpText={helpText}
      useClipboard={useClipboard}
      copyValue={handleCopyValue}
      notifier={notifier}
    >
      <ValidationWrapper
        notBlockingValidators={notBlockingValidators}
        blockingValidators={blockingValidators}
        provider={provider}
        detailObject={mainDetailObject}
      >
        <AsyncSelectWidget
          provider={provider}
          cacheTime={effectiveCacheTime}
          dataResourceUrl={dataResourceUrl}
          handleChange={handleChangeValue}
          value={value}
          isClearable={isClearable}
          defaultOptions={defaultOptions}
          getOptionLabel={optionLabel}
          getOptionValue={optionValue}
          searchParamName={searchParamName}
        />
      </ValidationWrapper>
    </WidgetWrapper>
  )
}

export { ForeignKeySelectWidget }
