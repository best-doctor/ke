import React, { useCallback, forwardRef } from 'react'
import DatePicker from 'react-datepicker'
import { format } from 'date-fns'

import { css } from '@emotion/css'
import cn from 'classnames'
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
  isClearable?: boolean
  showTimeSelect: boolean
  placeholder?: string
  clearButtonClassName?: string
  wrapperClassName?: string
  popperClassName?: string
  timeCaption?: string
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
 * @param placeholder - displayed placeholder
 * @param clearButtonClassName - class name for clear button
 * @param wrapperClassName - class name for wrapper
 * @param popperClassName - class name for popper
 * @param timeCaption - title of time input
 */

const clearButonCss = css`
  &::after {
    color: #cccccc;
    background-color: transparent;
    font-size: 24px;
  }
`

const pooperCss = css`
  z-index: 1001;
`

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
      clearButtonClassName,
      popperClassName,
      timeCaption = 'Время',
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
      <DatePicker
        className={className}
        clearButtonClassName={cn(clearButonCss, clearButtonClassName)}
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
        popperClassName={cn(pooperCss, popperClassName)}
        customInput={<ChakraDateInput ref={ref} />}
        timeCaption={timeCaption}
      />
    )
  }
)
