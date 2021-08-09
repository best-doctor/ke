import React, { forwardRef } from 'react'

import { ChipInput } from './ChipInput'
import { ControlProps } from '../types'

export const PhoneChipInput = forwardRef<HTMLInputElement, ControlProps<string[]>>(
  (props, ref): JSX.Element => (
    <ChipInput
      {...props}
      ref={ref}
      errorText="Введите валидный номер телефона"
      validator={(v: string) => /^\+?[1-9]\d{1,14}$/.test(v)}
      submitKeys={['Enter', 'Tab', ',', ' ', ';']}
    />
  )
)
