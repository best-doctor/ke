import React from 'react'
import { format } from 'date-fns'

import { DateTimeInput } from '../../django-spa/Controls'
import { useWidgetInitialization } from '../../common/hooks/useWidgetInitialization'
import { WidgetWrapper } from '../../common/components/WidgetWrapper'
import { EventNameEnum, WidgetTypeEnum } from '../../integration/analytics/firebase/enums'
import { handleUserAction } from '../../common/utils/handleUserAction'

import type { OptionalDate, WidgetProps } from '../../typing'

const eventName = EventNameEnum.DATETIME_CHANGE
const widgetType = WidgetTypeEnum.INPUT

type DateTimeWidgetProps = {
  minDate?: Date
  maxDate?: Date
  filterDate?: (dateValue: Date) => boolean
  filterTime?: (dateValue: Date) => boolean
  dateFormat?: string
  className?: string
  isClearable?: boolean
  placeholder?: string
}

/**
 * Render date-time picker
 * Waits for data type: ISO Date-string
 *
 * @param props - widget props
 */
const DateTimeWidget = (props: WidgetProps & DateTimeWidgetProps): JSX.Element => {
  const {
    name,
    helpText,
    description,
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
  } = props

  const context = containerStore.getState()
  const { targetUrl, content, isRequired } = useWidgetInitialization({ ...props, context })

  const contentDate = content ? new Date(content as string) : null
  setInitialValue({ [name]: content })

  const handleChange = (value: OptionalDate): void => {
    const widgetValue = value ? format(value, "yyyy-MM-dd'T'HH:mm:ss") : ''

    handleUserAction({ ...props, widgetValue, targetUrl, eventName, widgetType })
  }

  return (
    <WidgetWrapper
      name={name}
      style={{ ...style, zIndex: 1000 }}
      helpText={helpText}
      description={description}
      required={isRequired}
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
      />
    </WidgetWrapper>
  )
}

export { DateTimeWidget }
