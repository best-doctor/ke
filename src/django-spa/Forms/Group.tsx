import React, { ReactNode, useCallback } from 'react'
import { RecordData, RecordValidator, useField, useRecord } from '@cdk/Forms'

import { NodeProps } from './types'

export function Group({ name, children }: GroupProps): JSX.Element {
  const { value, onChange } = useField(name)

  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    throw new TypeError(`Form Group for name ${name} got "${JSON.stringify(value)}" but waited for dictionary`)
  }

  const handleChange = useCallback(
    (data: RecordData) => {
      onChange(Object.fromEntries(Object.entries(data).map(([key, field]) => [key, field.value])))
    },
    [onChange]
  )

  const [Root, props] = useRecord(value as Record<string | number, unknown>, handleChange)

  return <Root {...props}>{children}</Root>
}

interface GroupProps extends NodeProps {
  validator: RecordValidator
  children: ReactNode
}
