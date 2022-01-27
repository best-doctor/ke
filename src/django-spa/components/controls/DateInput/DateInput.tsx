import React, { forwardRef } from 'react'
import { BaseDateInput, BaseDateInputProps } from './BaseDateInput'

type DateInputProps = Omit<BaseDateInputProps, 'showTimeSelect' | 'filterTime'>

export const DateInput = forwardRef<HTMLInputElement, DateInputProps>((props, ref): JSX.Element => {
  const { dateFormat = 'dd.MM.yyyy', ...rest } = props
  // Это обёртка
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <BaseDateInput {...rest} ref={ref} showTimeSelect={false} dateFormat={dateFormat} />
})
