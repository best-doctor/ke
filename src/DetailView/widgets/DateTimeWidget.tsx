/* eslint-disable react/jsx-props-no-spreading */
/* Это legacy */
import React, { useEffect } from 'react'
import { format } from 'date-fns'

import { DateTimeInput } from '@components/controls'
import { useWidgetInitialization } from '../../common/hooks/useWidgetInitialization'
import { WidgetWrapper } from '../../common/components/WidgetWrapper'
import { EventNameEnum, WidgetTypeEnum } from '../../integration/analytics'
import { handleUserAction } from '../../common/utils/handleUserAction'

import type { OptionalDate, WidgetProps } from '../../typing'
import { useCreateTestId } from '../../django-spa/aspects'

const eventName = EventNameEnum.DATETIME_CHANGE
const widgetType = WidgetTypeEnum.INPUT

type DateTimeWidgetAdditionalProps = {
  minDate?: Date
  maxDate?: Date
  filterDate?: (dateValue: Date) => boolean
  filterTime?: (dateValue: Date) => boolean
  dateFormat?: string
  className?: string
  isClearable?: boolean
  placeholder?: string
  wrapperClassName?: string
}

/**
 * Render date-time picker
 * Waits for data type: ISO Date-string
 *
 * @param props - widget props
 */

export type DateTimeWidgetProps = WidgetProps & DateTimeWidgetAdditionalProps

const DateTimeWidget = (props: DateTimeWidgetProps): JSX.Element => {
  const {
    name,
    helpText,
    style,
    setInitialValue,
    containerStore,
    minDate,
    maxDate,
    filterDate,
    filterTime,
    dateFormat = 'dd.MM.yyyy HH:mm',
    className,
    isClearable,
    placeholder,
    wrapperClassName,
  } = props

  const context = containerStore.getState()
  const { targetUrl, content, isRequired, widgetDescription } = useWidgetInitialization({ ...props, context })

  const contentDate = content ? new Date(content as string) : null
  useEffect(() => {
    setInitialValue({ [name]: content })
  }, [setInitialValue, name, content])

  const handleChange = (value: OptionalDate): void => {
    const widgetValue = value ? format(value, "yyyy-MM-dd'T'HH:mm:ss") : ''

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
      <DateTimeInput
        value={contentDate}
        onChange={(value: OptionalDate) => handleChange(value)}
        dateFormat={dateFormat}
        minDate={minDate}
        maxDate={maxDate}
        filterDate={filterDate}
        filterTime={filterTime}
        className={className}
        isClearable={isClearable}
        placeholder={placeholder}
        wrapperClassName={wrapperClassName}
        name={name}
      />
    </WidgetWrapper>
  )
}

export { DateTimeWidget }
