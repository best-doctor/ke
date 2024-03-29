import React, { forwardRef } from 'react'

import { BaseDateInput, BaseDateInputProps } from './BaseDateInput'

type DateTimeInputProps = Omit<BaseDateInputProps, 'showTimeSelect'>

export const DateTimeInput = forwardRef<HTMLInputElement, DateTimeInputProps>((props, ref): JSX.Element => {
  const { dateFormat = 'dd.MM.yyyy HH:mm', ...rest } = props
  // Это обёртка
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <BaseDateInput {...rest} ref={ref} showTimeSelect dateFormat={dateFormat} />
})
