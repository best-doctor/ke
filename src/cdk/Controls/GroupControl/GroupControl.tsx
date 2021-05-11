import React, { PropsWithChildren, useCallback } from 'react'
import { useRoot } from '@cdk/Forms'
import { usePropState } from '@cdk/Hooks'

export function GroupControl<T extends Record<string, unknown>>({
  value,
  onChange,
  children,
}: GroupControlProps<T>): JSX.Element {
  const [currentValue, setCurrentValue] = usePropState(value)

  const handleChange = useCallback(
    (val: T) => {
      setCurrentValue(val)
      onChange(val)
    },
    [onChange, setCurrentValue]
  )

  const { root: Root } = useRoot(currentValue, handleChange)

  return <Root>{children}</Root>
}

type GroupControlProps<T extends Record<string, unknown>> = PropsWithChildren<{
  value: T
  onChange: (val: T) => void
}>
