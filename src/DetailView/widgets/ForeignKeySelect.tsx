// Это легаси
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react'

import type { Accessor, DetailObject, WidgetProps } from 'typing'

import { BoxProps } from '@chakra-ui/react'
import { useWidgetInitialization } from '../../common/hooks/useWidgetInitialization'
import { ValidationWrapper } from '../../common/components/ValidationWrapper'
import { AsyncSelectWidget } from '../../common/components/AsyncSelectWidget'
import { WidgetWrapper } from '../../common/components/WidgetWrapper'
import { getAccessor, getCopyHandler, getPayload } from '../utils/dataAccess'
import { ExtendedProps } from '../../common/components/ReactSelectCustomization'
import { useCreateTestId } from '../../django-spa/aspects'
import { Provider } from '../../admin/providers'

export type ForeignKeySelectWidgetProps = WidgetProps &
  ExtendedProps & {
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
    containerProps?: BoxProps
    labelContainerProps?: BoxProps
    staleTime?: Accessor<number>
    allowAllDefinedValues?: Accessor<boolean>
    provider?: Provider
  }

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
    containerProps,
    labelContainerProps,
    staleTime,
    widgetClassName,
    componentsClasses,
    allowAllDefinedValues,
  } = props

  const context = containerStore.getState()

  const { targetUrl, content, dataResourceUrl, isRequired, widgetDescription } = useWidgetInitialization(
    { ...props, context },
    { allowAllDefinedValues: getAccessor(allowAllDefinedValues) }
  )
  const effectiveCacheTime = getAccessor(cacheTime, mainDetailObject, context)
  const selectStyle = getAccessor(styles, mainDetailObject, context)

  const [value, setValue] = React.useState<object | null>(content as object | null)
  setInitialValue(value ? getPayload(value, name, targetPayload) : null)

  useEffect(() => {
    setValue(content as object | null)
  }, [content])

  const handleChangeValue = (changeValue: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(changeValue)

    const widgetPayload = getPayload(changeValue, name, targetPayload)

    submitChange({ url: targetUrl, payload: widgetPayload })
  }

  const handleCopyValue = getCopyHandler(value, copyValue, () => optionLabel(value, mainDetailObject))
  const { getDataTestId } = useCreateTestId()

  return (
    <WidgetWrapper
      name={name}
      style={style}
      helpText={helpText}
      description={widgetDescription}
      useClipboard={useClipboard}
      copyValue={handleCopyValue}
      notifier={notifier}
      required={isRequired}
      containerProps={containerProps}
      labelContainerProps={labelContainerProps}
      {...getDataTestId(props)}
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
          staleTime={staleTime}
          className={widgetClassName}
          componentsClasses={componentsClasses}
          name={name}
        />
      </ValidationWrapper>
    </WidgetWrapper>
  )
}

export { ForeignKeySelectWidget }
