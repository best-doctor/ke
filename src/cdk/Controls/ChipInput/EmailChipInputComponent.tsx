import React from 'react'

import { ChipInput } from './ChipInput'

export const EmailChipInputComponent = ({
  content,
  handleChange,
}: {
  content: string[]
  handleChange: (v: string[]) => void
}): JSX.Element => (
  <ChipInput
    content={content}
    handleChange={handleChange}
    errorText="Введите валидный email"
    validator={(value) => /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(value)}
    submitKeys={['Enter', 'Tab', ',', ' ', ';']}
  />
)
