import React, { useCallback } from 'react'
import { CheckboxGroup, Checkbox } from '@chakra-ui/react'

import { ControlProps } from '../types'

type CheckBoxGroupProps<T> = ControlProps<T[]> & {
  getKey: (v: T) => string
  getValue: (v: T) => string
  getLabel: (v: T) => string
  defaultValue?: string[]
}

const CheckBoxGroupInner = <T extends object>(
  props: CheckBoxGroupProps<T>,
  ref?: React.ForwardedRef<HTMLInputElement>
): JSX.Element => {
  const { value, onChange, getKey, getValue, getLabel, defaultValue } = props

  const handleChange = useCallback(
    (changeValues: (string | number)[]): void => {
      onChange(value.filter((v) => changeValues.includes(getValue(v))))
    },
    [onChange, getValue, value]
  )

  return (
    <div ref={ref}>
      <CheckboxGroup colorScheme="brand" defaultValue={defaultValue} onChange={(values) => handleChange(values)}>
        {value.map((v: T) => (
          <Checkbox spacing={8} key={getKey(v)} value={getValue(v)}>
            {getLabel(v)}
          </Checkbox>
        ))}
      </CheckboxGroup>
    </div>
  )
}

export const CheckBoxGroup = React.forwardRef(CheckBoxGroupInner) as <T extends object>(
  props: CheckBoxGroupProps<T> & { ref?: React.ForwardedRef<HTMLDivElement> }
) => ReturnType<typeof CheckBoxGroupInner>
