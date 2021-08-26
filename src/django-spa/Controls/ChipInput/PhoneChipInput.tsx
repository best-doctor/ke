import React, { forwardRef } from 'react'

import { ChipInput } from './ChipInput'
import { ControlProps } from '../types'

interface PhoneChipInputProps extends ControlProps<string[]> {
  chipClassName?: string
  inputClassName?: string
}

export const PhoneChipInput = forwardRef<HTMLInputElement, PhoneChipInputProps>(
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
