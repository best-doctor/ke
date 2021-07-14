import React from 'react'

import { BaseDateInput, BaseDateInputProps } from './BaseDateInput'

type DateTimeInputProps = Omit<BaseDateInputProps, 'showTimeSelect'>

export const DateTimeInput = (props: DateTimeInputProps): JSX.Element => {
  const { dateFormat = 'dd.MM.yyyy HH:mm', ...rest } = props
  return <BaseDateInput {...rest} showTimeSelect dateFormat={dateFormat} />
}
