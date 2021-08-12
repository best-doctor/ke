import React, { useCallback, forwardRef } from 'react'
import DatePicker from 'react-datepicker'
import { format } from 'date-fns'

import styled from '@emotion/styled'
// import { StyleDateTime } from './styles'
import { OptionalDate } from './types'
import { ControlProps } from '../types'
import { ChakraDateInput } from './ChakraDateInput'

export type BaseDateInputProps = ControlProps<OptionalDate> & {
  minDate?: Date
  maxDate?: Date
  filterDate?: (v: Date) => boolean
  filterTime?: (v: Date) => boolean
  dateFormat?: string
  className?: string
  wrapperClassName?: string
  isClearable?: boolean
  showTimeSelect: boolean
  placeholder?: string
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

const StyledDatePicker = styled(DatePicker)({
  '& .react-datepicker-popper': {
    zIndex: '1001 !important' as any,
  },
  '& .react-datepicker__close-icon': {
    height: '40px',
  },
  '& .react-datepicker__close-icon::after': {
    color: '#cccccc',
    backgroundColor: 'transparent',
    fontSize: '24px',
  },
})
export const BaseDateInput = forwardRef<HTMLInputElement, BaseDateInputProps>(
  (
    {
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
      placeholder,
      wrapperClassName,
    },
    ref
  ): JSX.Element => {
    const [date, setDate] = React.useState<OptionalDate>(value)
    if (format(value || new Date(), dateFormat) !== format(date || new Date(), dateFormat)) {
      setDate(value)
    }

    const handleChange = useCallback(
      (v: OptionalDate) => {
        setDate(v)
        onChange(v)
      },
      [onChange]
    )

    return (
      <StyledDatePicker
        className={className}
        wrapperClassName={wrapperClassName}
        selected={date}
        onChange={handleChange}
        dateFormat={dateFormat}
        minDate={minDate}
        maxDate={maxDate}
        filterDate={filterDate}
        filterTime={filterTime}
        showDisabledMonthNavigation
        isClearable={isClearable}
        showTimeSelect={showTimeSelect}
        placeholderText={placeholder}
        customInput={<ChakraDateInput ref={ref} />}
      />
    )
  }
)
