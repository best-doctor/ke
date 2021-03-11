import React from 'react'
import BaseSelect, { ValueType } from 'react-select'
import { useStore } from 'effector-react'
import type { Store } from 'effector'

import type { BaseSelectProps } from './types'

export function AsyncSelect<T>({ value, onChange, $options, ...other }: AsyncSelectProps<T>): JSX.Element {
  const options = useStore($options)
  return <BaseSelect options={options} value={value} onChange={onChange as (v: ValueType<T>) => void} {...other} />
}

type AsyncSelectProps<T> = BaseSelectProps<T> & {
  $options: Store<readonly T[]>
}
