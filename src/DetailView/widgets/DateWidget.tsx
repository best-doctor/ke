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

type DateWidgetProps = {
  minDate?: Date
  maxDate?: Date
  filterDate?: (dateValue: Date) => boolean
}

/**
 * Render date picker
 *
 * @param props - widget props
 */
const DateWidget = (props: WidgetProps & DateWidgetProps): JSX.Element => {
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
    required = false,
  } = props

  const context = containerStore.getState()
  const { targetUrl, content } = useWidgetInitialization({ ...props, context })

  const contentDate = content ? new Date(content as string) : null
  const [date, setDate] = React.useState<OptionalDate>(contentDate)
  if (format(contentDate || new Date(), 'yyyy-MM-dd') !== format(date || new Date(), 'yyyy-MM-dd')) {
    setDate(contentDate)
  }

  setInitialValue({ [name]: content })

  const handleChange = (value: OptionalDate): void => {
    setDate(value)
    const widgetValue = value ? format(value, 'yyyy-MM-dd') : ''

    handleUserAction({ ...props, widgetValue, targetUrl, eventName, widgetType })
  }

  return (
    <WidgetWrapper
      name={name}
      style={{ ...style, zIndex: 1000 }}
      helpText={helpText}
      description={description}
      required={required}
    >
      <StyleDateTime>
        <DatePicker
          className="styled-date-time"
          selected={date}
          onChange={(value: Date) => handleChange(value)}
          dateFormat="yyyy-MM-dd"
          minDate={minDate}
          maxDate={maxDate}
          filterDate={filterDate}
          showDisabledMonthNavigation
        />
      </StyleDateTime>
    </WidgetWrapper>
  )
}

export { DateWidget }
