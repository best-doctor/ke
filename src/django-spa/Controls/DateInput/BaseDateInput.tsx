import React from 'react'
import DatePicker from 'react-datepicker'
import { format } from 'date-fns'

import { StyleDateTime } from './styles'
import { OptionalDate } from './types'
import { ControlProps } from '../types'

export type BaseDateInputProps = ControlProps<OptionalDate> & {
  minDate?: Date
  maxDate?: Date
  filterDate?: (v: Date) => boolean
  filterTime?: (v: Date) => boolean
  dateFormat?: string
  className?: string
  isClearable?: boolean
  showTimeSelect: boolean
}

/**
 * Render date/datetime picker
 *
 * @param value - date to be shown
 * @param minDate - minimal date to be displayed in datepicker
 * @param maxDate - maximal date to be displayed in datepicker
 * @param filterDate - function to filter available dates
 * @param filterTime - function to filter available times
 * @param onChange - handler on value change
 * @param dateFormat - displayed date format
 * @param className - class name for element
 * @param isClearable - allow input to be clearable
 * @param showTimeSelect - show time select
 */
export const BaseDateInput = ({
  value,
  minDate,
  maxDate,
  filterDate,
  filterTime,
  onChange,
  dateFormat = 'dd.MM.yyyy',
  className = 'styled-date-time',
  isClearable = false,
  showTimeSelect,
}: BaseDateInputProps): JSX.Element => {
  const [date, setDate] = React.useState<OptionalDate>(value)
  if (format(value || new Date(), dateFormat) !== format(date || new Date(), dateFormat)) {
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
        filterTime={filterTime}
        showDisabledMonthNavigation
        isClearable={isClearable}
        showTimeSelect={showTimeSelect}
      />
    </StyleDateTime>
  )
}
