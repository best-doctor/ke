import React from 'react'
import DatePicker from 'react-datepicker'
import { format } from 'date-fns'

import { StyleDateTime } from '../../common/components/BaseDateTimeRangeWidget'
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
  } = props

  const context = containerStore.getState()
  const { targetUrl, content, isRequired } = useWidgetInitialization({ ...props, context })

  const contentDate = content ? new Date(content as string) : null
  const [date, setDate] = React.useState<OptionalDate>(contentDate)
  if (
    format(contentDate || new Date(), "yyyy-MM-dd'T'HH:mm:ss") !== format(date || new Date(), "yyyy-MM-dd'T'HH:mm:ss")
  ) {
    setDate(contentDate)
  }

  setInitialValue({ [name]: content })

  const handleChange = (value: OptionalDate): void => {
    setDate(value)
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
      <StyleDateTime>
        <DatePicker
          className="styled-date-time"
          selected={date}
          onChange={(value: Date) => handleChange(value)}
          showTimeSelect
          dateFormat={dateFormat}
          minDate={minDate}
          maxDate={maxDate}
          filterDate={filterDate}
          filterTime={filterTime}
          showDisabledMonthNavigation
        />
      </StyleDateTime>
    </WidgetWrapper>
  )
}

export { DateTimeWidget }
