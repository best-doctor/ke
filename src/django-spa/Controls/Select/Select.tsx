import React from 'react'
import BaseSelect from 'react-select'

import type { BaseSelectProps, Option } from './types'

export function Select<T extends Option>({ value, onChange, ...other }: SelectProps<T>): JSX.Element {
  return <BaseSelect value={value} onChange={onChange as (v: T | readonly T[] | undefined | null) => void} {...other} />
}

type SelectProps<T extends Option> = BaseSelectProps<T> & {
  options: readonly T[]
}
