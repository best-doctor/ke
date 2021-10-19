import React, { forwardRef } from 'react'

import { ChipInput } from './ChipInput'
import { ControlProps } from '../types'

export interface PhoneChipInputProps extends ControlProps<string[]> {
  /**
   * Displayed placeholder
   */
  placeholder?: string
  /**
   ClassName of each Chip
   */
  chipClassName?: string
  /**
   ClassName of input
   */
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
