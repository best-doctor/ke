import * as React from 'react'
import type { FunctionComponentElement, PropsWithChildren } from 'react'

import type { NodeProps } from './types'
import { useNodeState, FormsContextProvider } from './Forms.context'

export function FormArray({ name, children }: FormArrayProps): FunctionComponentElement<FormArrayProps> {
  const [data, setData] = useNodeState(name)

  if (!Array.isArray(data)) {
    throw new TypeError(`FormArray for name ${name} got ${typeof data} but waited for array`)
  }

  return <FormsContextProvider value={[data, setData]}>{children}</FormsContextProvider>
}

type FormArrayProps = PropsWithChildren<NodeProps>
