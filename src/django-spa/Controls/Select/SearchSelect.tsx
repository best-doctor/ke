import React from 'react'
import BaseSelect from 'react-select/async'

import type { BaseSelectProps, Option } from './types'

export function SearchSelect<T extends Option>({ value, onChange, ...other }: SearchSelectProps<T>): JSX.Element {
  return <BaseSelect value={value} onChange={onChange as (v: T | readonly T[] | undefined | null) => void} {...other} />
}

type SearchSelectProps<T extends Option> = BaseSelectProps<T> & {
  defaultOptions: readonly T[]
  loadOptions: (search: string) => Promise<T[]>
}
