import React, { FunctionComponentElement, ReactNode, useCallback } from 'react'
import { ArrRoot, RootValueDesc, FieldError, useRoot, useValue } from '@cdk/Forms'

import type { NodeProps } from './types'

export function Arr({ name, children: makeNodeItem }: ArrProps): FunctionComponentElement<ArrProps> {
  const { value, setValue } = useValue(name)

  if (!Array.isArray(value)) {
    throw new TypeError(`Form Array for name ${name} got ${typeof value} but waited for array`)
  }

  const handleChange = useCallback(
    (desc: RootValueDesc<ArrRoot>) => {
      setValue({
        value: desc.value,
        errors: desc.errors.indexOf(null) < 0 ? (desc.errors.flat() as FieldError[]) : null,
      })
    },
    [setValue]
  )

  const { Root } = useRoot(value, handleChange)

  return <Root>{value.map(makeNodeItem)}</Root>
}

interface ArrProps extends NodeProps {
  children: (val: unknown, index: number) => ReactNode
}
