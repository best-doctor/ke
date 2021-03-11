import React from 'react'
import BaseSelect from 'react-select'
import { useStore } from 'effector-react'
import type { Store } from 'effector'

import type { BaseSelectProps, Option } from './types'

export function AsyncSelect<T extends Option>({
  value,
  onChange,
  $options,
  ...other
}: AsyncSelectProps<T>): JSX.Element {
  const options = useStore($options)
  return (
    <BaseSelect
      options={options}
      value={value}
      onChange={onChange as (v: T | readonly T[] | undefined | null) => void}
      {...other}
    />
  )
}

type AsyncSelectProps<T extends Option> = BaseSelectProps<T> & {
  $options: Store<readonly T[]>
}
