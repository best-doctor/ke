import React, { useCallback } from 'react'
import { CheckboxGroup, Checkbox } from '@chakra-ui/react'

import { ControlProps } from '../types'

type CheckBoxGroupProps<T> = ControlProps<T[]> & {
  getKey: (v: T) => string
  getValue: (v: T) => string
  getLabel: (v: T) => string
  defaultValue?: string[]
}

export const CheckBoxGroup = <T extends object>(props: CheckBoxGroupProps<T>): JSX.Element => {
  const { value, onChange, getKey, getValue, getLabel, defaultValue } = props

  const handleChange = useCallback(
    (changeValues: (string | number)[]): void => {
      onChange(value.filter((v) => changeValues.includes(getValue(v))))
    },
    [onChange, getValue, value]
  )

  return (
    <CheckboxGroup colorScheme="teal" defaultValue={defaultValue} onChange={(values) => handleChange(values)}>
      {value.map((v: T) => (
        <Checkbox spacing={8} key={getKey(v)} value={getValue(v)}>
          {getLabel(v)}
        </Checkbox>
      ))}
    </CheckboxGroup>
  )
}
