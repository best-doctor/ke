import React, { forwardRef } from 'react'
import BaseSelect from 'react-select'
import { useStore } from 'effector-react'
import type { Store } from 'effector'

import { BaseSelectProps, Option } from './types'

const AsyncSelectInner = <T extends Option>(
  { value, onChange, $options, ...other }: AsyncSelectInnerProps<T>,
  ref?: React.ForwardedRef<HTMLDivElement>
): JSX.Element => {
  const options = useStore($options)
  return (
    <BaseSelect
      options={options}
      value={value}
      onChange={onChange as (v: T | readonly T[] | undefined | null) => void}
      inputRef={ref}
      {...other}
    />
  )
}

export const AsyncSelect = forwardRef(AsyncSelectInner) as AsyncSelectProps

type AsyncSelectProps = <T extends Option>(
  props: AsyncSelectInnerProps<T> & { ref?: React.ForwardedRef<HTMLDivElement> }
) => ReturnType<typeof AsyncSelectInner>

type AsyncSelectInnerProps<T extends Option> = BaseSelectProps<T> & {
  $options: Store<readonly T[]>
}
