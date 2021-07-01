import React from 'react'
import DatePicker from 'react-datepicker'
import { format } from 'date-fns'

import { StyleDateTime } from '../../../common/components/BaseDateTimeRangeWidget'
import type { OptionalDate } from '../../../typing'

type DateInputProps = {
  value: OptionalDate
  minDate?: Date
  maxDate?: Date
  filterDate?: (v: Date) => boolean
  onChange: (v: Date) => void
  dateFormat?: string
  className?: string
  isClearable?: boolean
}

/**
 * Render date picker
 *
 * @param props.value - date to be shown
 * @param props.minDate - minimal date to be displayed in datepicker
 * @param props.maxDate - maximal date to be displayed in datepicker
 * @param props.filterDate - function to filter available dates
 * @param props.onChange - handler on value change
 * @param props.dateFormat - displayed date format
 * @param props.className - class name for element
 * @param props.isClearable - allow input to be clearable
 */
const DateInput = (props: DateInputProps): JSX.Element => {
  const {
    value,
    minDate,
    maxDate,
    filterDate,
    onChange,
    dateFormat = 'dd.MM.yyyy',
    className = 'styled-date-time',
    isClearable = false,
  } = props

  const [date, setDate] = React.useState<OptionalDate>(value)
  if (format(value || new Date(), 'yyyy-MM-dd') !== format(date || new Date(), 'yyyy-MM-dd')) {
    setDate(value)
  }

  return (
    <StyleDateTime>
      <DatePicker
        className={className}
        selected={date}
        onChange={(v: Date) => {
          setDate(v)
          onChange(v)
        }}
        dateFormat={dateFormat}
        minDate={minDate}
        maxDate={maxDate}
        filterDate={filterDate}
        showDisabledMonthNavigation
        isClearable={isClearable}
      />
    </StyleDateTime>
  )
}

export { DateInput }
