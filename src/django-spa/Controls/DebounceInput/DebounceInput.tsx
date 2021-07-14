import React, { ChangeEvent, useCallback } from 'react'
import { DebounceInput as BaseDebounceInput } from 'react-debounce-input'

import { ControlProps } from '../types'

export function DebounceInput({ value, onChange }: ControlProps<string>): JSX.Element {
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>): void => {
      onChange(e.target.value)
    },
    [onChange]
  )

  return <BaseDebounceInput value={value} onChange={handleChange} debounceTimeout={1000} />
}
