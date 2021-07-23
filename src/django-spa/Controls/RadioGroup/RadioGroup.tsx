import React, { useCallback } from 'react'
import { Radio, RadioGroup as ChakraRadioGroup } from '@chakra-ui/react'

import { ControlProps } from '../types'

type RadioGroupProps<T> = ControlProps<T | undefined> & {
  items: T[]
  getKey: (v: T) => string
  getValue: (v: T) => string
  getLabel: (v: T) => string
}

export const RadioGroup = <T extends object>(props: RadioGroupProps<T>): JSX.Element => {
  const { value, items, onChange, getKey, getValue, getLabel } = props

  const handleChange = useCallback(
    (changeValue: string) => {
      onChange(items.find((v) => getValue(v) === changeValue))
    },
    [onChange, getValue, items]
  )

  return (
    <ChakraRadioGroup defaultValue={value && getValue(value)} onChange={(v) => handleChange(v)}>
      {items.map((v: T) => (
        <Radio key={getKey(v)} value={getValue(v)}>
          {getLabel(v)}
        </Radio>
      ))}
    </ChakraRadioGroup>
  )
}
