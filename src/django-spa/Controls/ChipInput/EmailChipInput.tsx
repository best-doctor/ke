import React, { forwardRef } from 'react'

import { ChipInput } from './ChipInput'
import { ControlProps } from '../types'

export const EmailChipInput = forwardRef<HTMLInputElement, ControlProps<string[]>>(
  (props, ref): JSX.Element => (
    <ChipInput
      {...props}
      ref={ref}
      errorText="Введите валидный email"
      validator={(v) => /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(v)}
      submitKeys={['Enter', 'Tab', ',', ' ', ';']}
    />
  )
)
