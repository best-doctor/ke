/* eslint-disable react/jsx-props-no-spreading */
/* Это legacy */
import React, { useEffect } from 'react'
import { format } from 'date-fns'

import { DateInput } from '@components/controls'
import { useWidgetInitialization } from '../../common/hooks/useWidgetInitialization'
import { WidgetWrapper } from '../../common/components/WidgetWrapper'
import { EventNameEnum, WidgetTypeEnum } from '../../integration/analytics'
import { handleUserAction } from '../../common/utils/handleUserAction'

import type { Accessor, OptionalDate, WidgetProps } from '../../typing'
import { useCreateTestId } from '../../django-spa/aspects'
import { getAccessor } from '../utils/dataAccess'
import { useStore } from 'effector-react'

const eventName = EventNameEnum.DATETIME_CHANGE
const widgetType = WidgetTypeEnum.INPUT

type DateWidgetAdditionalProps = {
  minDate?: Accessor<Date>
  maxDate?: Accessor<Date>
  filterDate?: (dateValue: Date) => boolean
  dateFormat?: string
  className?: string
  isClearable?: boolean
  wrapperClassName?: string
  isDisabled?: Accessor<boolean>
}

export type DateWidgetProps = WidgetProps & DateWidgetAdditionalProps

/**
 * Render date picker
 *
 * @param props - widget props
 */
const DateWidget = (props: DateWidgetProps): JSX.Element => {
  const {
    name,
    helpText,
    style,
    setInitialValue,
    containerStore,
    minDate,
    maxDate,
    filterDate,
    dateFormat = 'dd.MM.yyyy',
    className,
    isClearable,
    wrapperClassName,
    allowAllDefinedValues,
    isDisabled,
    mainDetailObject,
  } = props

  const context = useStore(containerStore)
  const { targetUrl, content, isRequired, widgetDescription } = useWidgetInitialization(
    { ...props, context },
    { allowAllDefinedValues: getAccessor(allowAllDefinedValues) }
  )

  const contentDate = content ? new Date(content as string) : null
  useEffect(() => {
    setInitialValue({ [name]: content })
  }, [setInitialValue, name, content])

  const handleChange = (value: OptionalDate): void => {
    const widgetValue = value ? format(value, 'yyyy-MM-dd') : ''
    handleUserAction({ ...props, widgetValue, targetUrl, eventName, widgetType })
  }
  const { getDataTestId } = useCreateTestId()
  return (
    <WidgetWrapper
      name={name}
      style={{ ...style, zIndex: 1000 }}
      helpText={helpText}
      description={widgetDescription}
      required={isRequired}
      {...getDataTestId(props)}
    >
      <DateInput
        value={contentDate}
        onChange={(value: OptionalDate) => handleChange(value)}
        dateFormat={dateFormat}
        minDate={getAccessor(minDate, mainDetailObject, context)}
        maxDate={getAccessor(maxDate, mainDetailObject, context)}
        filterDate={filterDate}
        className={className}
        isClearable={isClearable}
        wrapperClassName={wrapperClassName}
        isDisabled={getAccessor(isDisabled, mainDetailObject, context)}
      />
    </WidgetWrapper>
  )
}

export { DateWidget }
