import React, { ChangeEvent, FC, useCallback, forwardRef } from 'react'
import { DebounceInput as BaseDebounceInput } from 'react-debounce-input'
import { Input } from '@chakra-ui/react'

import { ControlProps } from '../types'

type DebounceInputProps = ControlProps<string> & {
  debounceTimeout?: number
  element?: FC<unknown>
  // TODO: infer exact types for rest props from BaseDebounceInput props
  [key: string]: unknown
}

export const DebounceInput = forwardRef<HTMLInputElement, DebounceInputProps>(
  ({ value, onChange, debounceTimeout = 1000, element = Input, ...rest }, ref): JSX.Element => {
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
        inputRef={ref}
        {...rest}
      />
    )
  }
) as (props: DebounceInputProps & { ref?: React.ForwardedRef<HTMLInputElement> }) => JSX.Element
