import * as React from 'react'
import { PropsWithChildren, useCallback } from 'react'

import { FormsContextProvider, FormsContextData } from '@forms'
import { usePropState } from '@hooks'

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

  return (
    <FormsContextProvider value={[currentValue, handleChange as (val: FormsContextData) => void]}>
      {children}
    </FormsContextProvider>
  )
}

type GroupControlProps<T extends Record<string, unknown>> = PropsWithChildren<{
  value: T
  onChange: (val: T) => void
}>
