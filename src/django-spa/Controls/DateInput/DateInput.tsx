import React from 'react'
import DatePicker from 'react-datepicker'
import { format } from 'date-fns'

import { StyleDateTime } from './styles'
import { OptionalDate } from './types'
import { ControlProps } from '../types'

type DateInputProps = ControlProps<OptionalDate> & {
  minDate?: Date
  maxDate?: Date
  filterDate?: (v: Date) => boolean
  dateFormat?: string
  className?: string
  isClearable?: boolean
}

/**
 * Render date picker
 *
 * @param value - date to be shown
 * @param minDate - minimal date to be displayed in datepicker
 * @param maxDate - maximal date to be displayed in datepicker
 * @param filterDate - function to filter available dates
 * @param onChange - handler on value change
 * @param dateFormat - displayed date format
 * @param className - class name for element
 * @param isClearable - allow input to be clearable
 */
const DateInput = ({
  value,
  minDate,
  maxDate,
  filterDate,
  onChange,
  dateFormat = 'dd.MM.yyyy',
  className = 'styled-date-time',
  isClearable = false,
}: DateInputProps): JSX.Element => {
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
