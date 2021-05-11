import React, { FunctionComponentElement, PropsWithChildren } from 'react'
import { useField, useRoot } from '@cdk/Forms'

import type { NodeProps } from './types'

export function Arr({ name, children }: ArrProps): FunctionComponentElement<ArrProps> {
  const [data, setData] = useField(name)

  if (!Array.isArray(data)) {
    throw new TypeError(`FormArray for name ${name} got ${typeof data} but waited for array`)
  }

  const { root: Root } = useRoot(data, setData)

  return <Root>{children}</Root>
}

type ArrProps = PropsWithChildren<NodeProps>
