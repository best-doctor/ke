import React, { ChangeEvent, useCallback } from 'react'
import { DebounceInput as BaseDebounceInput } from 'react-debounce-input'

export function DebounceInput({ value, onChange }: DebounceInputProps): JSX.Element {
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>): void => {
      onChange(e.target.value)
    },
    [onChange]
  )

  return <BaseDebounceInput value={value} onChange={handleChange} debounceTimeout={1000} />
}

interface DebounceInputProps {
  value?: string
  onChange: (val: string) => void
}
