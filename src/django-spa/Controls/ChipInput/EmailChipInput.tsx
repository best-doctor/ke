import React from 'react'

import { ChipInput } from './ChipInput'
import { ControlProps } from '../types'

export const EmailChipInput = (props: ControlProps<string[]>): JSX.Element => (
  <ChipInput
    {...props}
    errorText="Введите валидный email"
    validator={(v) => /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(v)}
    submitKeys={['Enter', 'Tab', ',', ' ', ';']}
  />
)
