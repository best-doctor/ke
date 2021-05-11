import React, { FunctionComponentElement, PropsWithChildren } from 'react'
import { FormValue, useField, useRoot } from '@cdk/Forms'

import { NodeProps } from './types'

export function Group({ name, children }: GroupProps): FunctionComponentElement<GroupProps> {
  const [value, setData] = useField(name)

  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    throw new TypeError(`FormGroup for name ${name} got "${JSON.stringify(value)}" but waited for dictionary`)
  }

  const { root: Root } = useRoot(value as FormValue, setData)

  return <Root>{children}</Root>
}

type GroupProps = PropsWithChildren<NodeProps>
