import React, { forwardRef } from 'react'
import BaseSelect from 'react-select'

import type { BaseSelectProps, Option } from './types'

const SelectInner = <T extends Option>(
  { value, onChange, ...other }: SelectInnerProps<T>,
  ref?: React.ForwardedRef<HTMLInputElement>
): JSX.Element => (
  // Это обёртка
  /* eslint-disable react/jsx-props-no-spreading */
  <BaseSelect
    value={value}
    onChange={onChange as (v: T | readonly T[] | undefined | null) => void}
    inputRef={ref}
    {...other}
  />
)

export const Select = forwardRef(SelectInner) as SelectProps

export type SelectProps = <T extends Option>(
  props: SelectInnerProps<T> & { ref?: React.ForwardedRef<HTMLDivElement> }
) => ReturnType<typeof SelectInner>

type SelectInnerProps<T extends Option> = BaseSelectProps<T> & {
  options: readonly T[]
}
