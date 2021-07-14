import React from 'react'
import { BaseDateInput, BaseDateInputProps } from './BaseDateInput'

type DateInputProps = Omit<BaseDateInputProps, 'showTimeSelect' | 'filterTime'>

export const DateInput = (props: DateInputProps): JSX.Element => {
  const { dateFormat = 'dd.MM.yyyy', ...rest } = props
  return <BaseDateInput {...rest} showTimeSelect={false} dateFormat={dateFormat} />
}
