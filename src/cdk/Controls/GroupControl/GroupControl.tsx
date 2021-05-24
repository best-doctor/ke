import React, { PropsWithChildren, useCallback } from 'react'
import { usePropState } from '@cdk/Hooks'
import { RecordData, useRecord } from '@cdk/Forms'

export function GroupControl({ value, onChange, children }: GroupControlProps): JSX.Element {
  const [currentValue, setCurrentValue] = usePropState(value)

  const handleChange = useCallback(
    (data: RecordData) => {
      const updated = Object.fromEntries(Object.entries(data).map(([key, field]) => [key, field.value]))
      setCurrentValue(updated)
      onChange(updated)
    },
    [onChange, setCurrentValue]
  )

  const [Root, props] = useRecord(currentValue, handleChange)

  return <Root {...props}>{children}</Root>
}

type GroupControlProps = PropsWithChildren<{
  value: Record<string | number, unknown>
  onChange: (val: Record<string | number, unknown>) => void
}>
