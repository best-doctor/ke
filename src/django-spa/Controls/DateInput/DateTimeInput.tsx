import React, { forwardRef } from 'react'

import { BaseDateInput, BaseDateInputProps } from './BaseDateInput'

type DateTimeInputProps = Omit<BaseDateInputProps, 'showTimeSelect'>

export const DateTimeInput = forwardRef<HTMLDivElement, DateTimeInputProps>(
  (props, ref): JSX.Element => {
    const { dateFormat = 'dd.MM.yyyy HH:mm', ...rest } = props
    return <BaseDateInput {...rest} ref={ref} showTimeSelect dateFormat={dateFormat} />
  }
)
