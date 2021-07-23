import React from 'react'

import { ChipInput } from './ChipInput'
import { ControlProps } from '../types'

export const PhoneChipInput = (props: ControlProps<string[]>): JSX.Element => (
  <ChipInput
    {...props}
    errorText="Введите валидный номер телефона"
    validator={(v: string) => /^\+?[1-9]\d{1,14}$/.test(v)}
    submitKeys={['Enter', 'Tab', ',', ' ', ';']}
  />
)
