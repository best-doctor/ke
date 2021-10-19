import React, { useCallback, forwardRef } from 'react'
import { Radio, RadioGroup as ChakraRadioGroup } from '@chakra-ui/react'

import { ControlProps } from '../types'

type RadioGroupProps<T> = ControlProps<T | undefined> & {
  /**
   * Radio group items
   */
  items: T[]
  /**
   * Function to get key for option
   */
  getKey: (v: T) => string
  /**
   * Function to get value for option
   */
  getValue: (v: T) => string
  /**
   * Function to get label for option
   */
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
        <Radio key={getKey(v)} value={getValue(v)} mr={4}>
          {getLabel(v)}
        </Radio>
      ))}
    </ChakraRadioGroup>
  )
}

export const RadioGroup = forwardRef(RadioGroupInner) as <T extends object>(
  props: RadioGroupProps<T> & { ref?: React.ForwardedRef<HTMLDivElement> }
) => ReturnType<typeof RadioGroupInner>
