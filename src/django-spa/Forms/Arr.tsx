import React, { FunctionComponentElement, ReactNode } from 'react'
import { useField, useRoot } from '@cdk/Forms'

import type { NodeProps } from './types'

export function Arr({ name, children: makeNodeItem }: ArrProps): FunctionComponentElement<ArrProps> {
  const [data, setData] = useField(name)

  if (!Array.isArray(data)) {
    throw new TypeError(`Form Array for name ${name} got ${typeof data} but waited for array`)
  }

  const { root: Root } = useRoot(data, setData)

  return <Root>{data.map(makeNodeItem)}</Root>
}

interface ArrProps extends NodeProps {
  children: (val: unknown, index: number) => ReactNode
}
