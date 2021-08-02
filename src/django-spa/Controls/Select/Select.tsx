import React, { forwardRef } from 'react'
import BaseSelect from 'react-select'

import type { BaseSelectProps, Option } from './types'

const SelectInner = <T extends Option>(
  { value, onChange, ...other }: SelectProps<T>,
  ref?: React.ForwardedRef<HTMLInputElement>
): JSX.Element => (
  <BaseSelect
    value={value}
    onChange={onChange as (v: T | readonly T[] | undefined | null) => void}
    inputRef={ref}
    {...other}
  />
)

export const Select = forwardRef(SelectInner) as <T extends Option>(
  props: SelectProps<T> & { ref?: React.ForwardedRef<HTMLDivElement> }
) => ReturnType<typeof SelectInner>

type SelectProps<T extends Option> = BaseSelectProps<T> & {
  options: readonly T[]
}
