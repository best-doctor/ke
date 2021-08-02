import React, { forwardRef } from 'react'
import { BaseDateInput, BaseDateInputProps } from './BaseDateInput'

type DateInputProps = Omit<BaseDateInputProps, 'showTimeSelect' | 'filterTime'>

export const DateInput = forwardRef<HTMLDivElement, DateInputProps>(
  (props, ref): JSX.Element => {
    const { dateFormat = 'dd.MM.yyyy', ...rest } = props
    return <BaseDateInput {...rest} ref={ref} showTimeSelect={false} dateFormat={dateFormat} />
  }
)
