import React, { ChangeEvent, FC, useCallback } from 'react'
import { DebounceInput as BaseDebounceInput } from 'react-debounce-input'
import { Input } from '@chakra-ui/react'

import { ControlProps } from '../types'

type DebounceInputProps = ControlProps<string> & {
  debounceTimeout?: number
  element?: FC<unknown>
  [key: string]: unknown
}

export function DebounceInput({
  value,
  onChange,
  debounceTimeout = 1000,
  element = Input,
  ...rest
}: DebounceInputProps): JSX.Element {
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>): void => {
      onChange(e.target.value)
    },
    [onChange]
  )

  return (
    <BaseDebounceInput
      value={value}
      onChange={handleChange}
      debounceTimeout={debounceTimeout}
      resize="none"
      element={element}
      {...rest}
    />
  )
}
