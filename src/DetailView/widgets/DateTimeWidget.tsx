import * as React from 'react'
import * as moment from 'moment'
import DatePicker from 'react-datepicker'

import { StyleDateTime } from '../../common/components/BaseDateTimeRangeWidget'
import { useWidgetInitialization } from '../../common/hooks/useWidgetInitialization'
import { WidgetWrapper } from '../../common/components/WidgetWrapper'
import { EventNameEnum, WidgetTypeEnum } from '../../integration/analytics/firebase/enums'
import { handleUserAction } from '../../common/utils/handleUserAction'

import type { OptionalDate, WidgetProps } from '../../typing'

const eventName = EventNameEnum.DATETIME_CHANGE
const widgetType = WidgetTypeEnum.INPUT

/**
 * Render date-time picker
 * Waits for data type: ISO Date-string
 *
 * @param props
 * @constructor
 */
const DateTimeWidget = (props: WidgetProps): JSX.Element => {
  const { name, helpText, style, setInitialValue, containerStore } = props

  const context = containerStore.getState()
  const { targetUrl, content } = useWidgetInitialization({ ...props, context })

  const contentDate = content ? new Date(content as string) : null
  const [date, setDate] = React.useState<OptionalDate>(contentDate)

  if (moment(contentDate).format('YYYY-MM-DDTHH:mm:ss') !== moment(date).format('YYYY-MM-DDTHH:mm:ss')) {
    setDate(contentDate)
  }

  setInitialValue({ [name]: content })

  const handleChange = (value: OptionalDate): void => {
    setDate(value)
    const widgetValue = value ? moment(value).format('YYYY-MM-DDTHH:mm:ss') : ''

    handleUserAction({ ...props, widgetValue, targetUrl, eventName, widgetType })
  }

  return (
    <WidgetWrapper style={{ ...style, zIndex: 1000 }} helpText={helpText}>
      <StyleDateTime>
        <DatePicker
          className="styled-date-time"
          selected={date}
          onChange={(value: Date) => handleChange(value)}
          showTimeSelect
          dateFormat="yyyy-MM-dd HH:mm"
        />
      </StyleDateTime>
    </WidgetWrapper>
  )
}

export { DateTimeWidget }
