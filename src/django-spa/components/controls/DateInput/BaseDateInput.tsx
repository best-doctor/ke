import React, { useCallback, forwardRef } from 'react'
import DatePicker from 'react-datepicker'
import { css } from '@emotion/css'
import cn from 'classnames'

import { OptionalDate } from './types'
import { ControlProps } from '../types'
import { ChakraDateInput } from './ChakraDateInput'

export type BaseDateInputProps = ControlProps<OptionalDate> & {
  /**
   * Minimal date to be displayed in datepicker
   */
  minDate?: Date
  /**
   * Maximal date to be displayed in datepicker
   */
  maxDate?: Date
  /**
   * Function to filter available dates
   */
  filterDate?: (v: Date) => boolean
  /**
   * Function to filter available times
   */
  filterTime?: (v: Date) => boolean
  /**
   * Displayed date format
   */
  dateFormat?: string
  /**
   * Class name for element
   */
  className?: string
  /**
   * Allow input to be clearable
   */
  isClearable?: boolean
  /**
   * Show time select
   */
  showTimeSelect: boolean
  /**
   * Displayed placeholder
   */
  placeholder?: string
  /**
   * Class name for clear button
   */
  clearButtonClassName?: string
  /**
   * Class name for wrapper
   */
  wrapperClassName?: string
  /**
   * Class name for popper
   */
  popperClassName?: string
  /**
   * Title of time input
   */
  timeCaption?: string

  isDisabled?: boolean

  name?: string
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

const clearButtonCss = css`
  &.react-datepicker__close-icon {
    height: auto;
    top: 50%;
    transform: translate(0, -50%);
    padding-right: 16px;
  }

  &.react-datepicker__close-icon::after {
    font-size: 11px;
  }
`

const popperCss = css`
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
      isDisabled,
      name,
    },
    ref
  ): JSX.Element => {
    const handleChange = useCallback(
      (v: OptionalDate) => {
        onChange(v)
      },
      [onChange]
    )

    return (
      <DatePicker
        className={className}
        clearButtonClassName={cn(clearButtonCss, clearButtonClassName)}
        wrapperClassName={wrapperClassName}
        selected={value}
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
        popperClassName={cn(popperCss, popperClassName)}
        customInput={<ChakraDateInput ref={ref} />}
        timeCaption={timeCaption}
        disabled={isDisabled}
        name={name}
      />
    )
  }
)
