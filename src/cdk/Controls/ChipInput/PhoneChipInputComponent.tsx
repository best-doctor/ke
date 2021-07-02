import React from 'react'

import { ChipInput } from './ChipInput'

export const PhoneChipInputComponent = ({
  content,
  handleChange,
}: {
  content: string[]
  handleChange: (v: string[]) => void
}): JSX.Element => (
  <ChipInput
    content={content}
    handleChange={handleChange}
    errorText="Введите валидный номер телефона"
    validator={(value: string) => /^\+?[1-9]\d{1,14}$/.test(value)}
    submitKeys={['Enter', 'Tab', ',', ' ', ';']}
  />
)
