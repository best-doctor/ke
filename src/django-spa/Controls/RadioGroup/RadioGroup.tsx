import React, { useCallback, forwardRef } from 'react'
import { Radio, RadioGroup as ChakraRadioGroup } from '@chakra-ui/react'

import { ControlProps } from '../types'

type RadioGroupProps<T> = ControlProps<T | undefined> & {
  items: T[]
  getKey: (v: T) => string
  getValue: (v: T) => string
  getLabel: (v: T) => string
}

const RadioGroupInner = <T extends object>(
  props: RadioGroupProps<T>,
  ref?: React.ForwardedRef<HTMLDivElement>
): JSX.Element => {
  const { value, items, onChange, getKey, getValue, getLabel } = props

  const handleChange = useCallback(
    (changeValue: string) => {
      onChange(items.find((v) => getValue(v) === changeValue))
    },
    [onChange, getValue, items]
  )

  return (
    <ChakraRadioGroup defaultValue={value && getValue(value)} onChange={(v) => handleChange(v)} ref={ref}>
      {items.map((v: T) => (
        <Radio key={getKey(v)} value={getValue(v)}>
          {getLabel(v)}
        </Radio>
      ))}
    </ChakraRadioGroup>
  )
}

export const RadioGroup = forwardRef(RadioGroupInner) as <T extends object>(
  props: RadioGroupProps<T> & { ref?: React.ForwardedRef<HTMLDivElement> }
) => ReturnType<typeof RadioGroupInner>
