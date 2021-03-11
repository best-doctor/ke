import React from 'react'
import BaseSelect, { ValueType } from 'react-select'

import type { BaseSelectProps } from './types'

export function Select<T>({ value, onChange, ...other }: SelectProps<T>): JSX.Element {
  return <BaseSelect value={value} onChange={onChange as (v: ValueType<T>) => void} {...other} />
}

type SelectProps<T> = BaseSelectProps<T> & {
  options: readonly T[]
}
