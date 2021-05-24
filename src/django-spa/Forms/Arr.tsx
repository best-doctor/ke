import React, { FunctionComponentElement, ReactNode, useCallback } from 'react'
import { useArray, useField, ArrayData } from '@cdk/Forms'

import type { NodeProps } from './types'

export function Arr({ name, getKey, children: makeNodeItem }: ArrProps): FunctionComponentElement<ArrProps> {
  const { value, onChange } = useField(name)

  if (!Array.isArray(value)) {
    throw new TypeError(`Form Array for name ${name} got ${typeof value} but waited for array`)
  }

  const handleChange = useCallback(
    (arrData: ArrayData) => {
      onChange(arrData.map((field) => field.value))
    },
    [onChange]
  )

  const [Root, props] = useArray(value, handleChange, getKey)

  return <Root {...props}>{value.map(makeNodeItem)}</Root>
}

interface ArrProps extends NodeProps {
  getKey: (item: unknown) => string | number
  children: (val: unknown, index: number) => ReactNode
}
