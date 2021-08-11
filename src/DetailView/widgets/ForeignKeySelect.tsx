import React, { useEffect } from 'react'

import type { Accessor, DetailObject, WidgetProps } from 'typing'

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
  isDisabled?: Accessor<boolean>
  defaultOptions?: boolean
  searchParamName?: string
  styles?: Accessor<object>
  optionLabelMenu?: (option: unknown, mainObject: DetailObject) => string
  optionLabelValue?: (option: unknown, mainObject: DetailObject) => string
  placeholder?: string
}

const eventName = EventNameEnum.FOREIGN_KEY_SELECT_OPTION_CHANGE
const widgetType = WidgetTypeEnum.INPUT

/**
 * Render select-input with async loaded options from backend
 * onChange - can return full loaded model for option, not just key
 *
 * Based on AsyncSelectWidget, so have common props.
 *
 * props.optionLabel - got loaded model and return label for option
 * props.optionValue - got loaded model and return label for value
 * props.targetPayload - got selected model and return widget payload
 * props.styles - react-select styles
 * props.optionLabelMenu - got loaded model and return menu label for option
 * props.optionLabelValue - got loaded model and return value label for option
 *
 * @param props - widget props
 */
const ForeignKeySelectWidget = (props: ForeignKeySelectWidgetProps): JSX.Element => {
  const {
    name,
    mainDetailObject,
    provider,
    helpText,
    description,
    targetPayload,
    optionLabel,
    optionValue,
    isClearable = false,
    defaultOptions = false,
    style,
    styles,
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
    optionLabelMenu,
    optionLabelValue,
    isDisabled = false,
    placeholder,
  } = props

  const context = containerStore.getState()

  const { targetUrl, content, dataResourceUrl, isRequired } = useWidgetInitialization({ ...props, context })
  const effectiveCacheTime = getAccessor(cacheTime, mainDetailObject, context)
  const selectStyle = getAccessor(styles, mainDetailObject, context)

  const [value, setValue] = React.useState<object | null>(content as object | null)
  setInitialValue(value ? getPayload(value, name, targetPayload) : null)

  useEffect(() => {
    setValue(content as object | null)
  }, [content])

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

  const handleCopyValue = getCopyHandler(value, copyValue, () => optionLabel(value, mainDetailObject))

  return (
    <WidgetWrapper
      name={name}
      style={style}
      helpText={helpText}
      description={description}
      useClipboard={useClipboard}
      copyValue={handleCopyValue}
      notifier={notifier}
      required={isRequired}
    >
      <ValidationWrapper
        notBlockingValidators={notBlockingValidators}
        blockingValidators={blockingValidators}
        provider={provider}
        detailObject={mainDetailObject}
        context={context as Record<string, unknown>}
      >
        <AsyncSelectWidget
          provider={provider}
          cacheTime={effectiveCacheTime}
          dataResourceUrl={dataResourceUrl}
          handleChange={handleChangeValue}
          value={value}
          isClearable={isClearable}
          defaultOptions={defaultOptions}
          getOptionLabel={(val: object | null) => optionLabel(val, mainDetailObject)}
          getOptionValue={optionValue}
          getOptionLabelMenu={
            optionLabelMenu ? (val: object | null) => optionLabelMenu(val, mainDetailObject) : undefined
          }
          getOptionLabelValue={
            optionLabelValue ? (val: object | null) => optionLabelValue(val, mainDetailObject) : undefined
          }
          searchParamName={searchParamName}
          styles={selectStyle}
          isDisabled={getAccessor(isDisabled, mainDetailObject, context)}
          placeholder={placeholder}
        />
      </ValidationWrapper>
    </WidgetWrapper>
  )
}

export { ForeignKeySelectWidget }
