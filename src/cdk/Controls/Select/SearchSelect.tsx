import React from 'react'
import type { OptionTypeBase, ValueType } from 'react-select'
import BaseSelect from 'react-select/async'

import type { BaseSelectProps } from './types'

export function SearchSelect<T extends OptionTypeBase>({
  value,
  onChange,
  ...other
}: SearchSelectProps<T>): JSX.Element {
  return <BaseSelect value={value} onChange={onChange as (v: ValueType<OptionTypeBase>) => void} {...other} />
}

type SearchSelectProps<T> = BaseSelectProps<T> & {
  defaultOptions: readonly T[]
  loadOptions: (search: string) => Promise<T[]>
}
