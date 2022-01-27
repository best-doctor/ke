import React, { forwardRef } from 'react'

import { ChipInput } from './ChipInput'
import { ControlProps } from '../types'

export interface EmailChipInputProps extends ControlProps<string[]> {
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

export const EmailChipInput = forwardRef<HTMLInputElement, EmailChipInputProps>(
  (props, ref): JSX.Element => (
    // Это обёртка
    /* eslint-disable react/jsx-props-no-spreading */
    <ChipInput
      {...props}
      ref={ref}
      errorText="Введите валидный email"
      validator={(v) => /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(v)}
      submitKeys={['Enter', 'Tab', ',', ' ', ';']}
    />
  )
)
