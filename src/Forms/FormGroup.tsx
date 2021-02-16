import * as React from 'react'
import type { FunctionComponentElement, PropsWithChildren } from 'react'

import type { FormsContextData, NodeProps } from './types'
import { useNodeState, FormsContextProvider } from './Forms.context'

export function FormGroup({ name, children }: FormGroupProps): FunctionComponentElement<FormGroupProps> {
  const [data, setData] = useNodeState(name)

  if (typeof data !== 'object' || data === null || Array.isArray(data)) {
    throw new TypeError(`FormGroup for name ${name} got "${JSON.stringify(data)}" but waited for dictionary`)
  }

  return <FormsContextProvider value={[data as FormsContextData, setData]}>{children}</FormsContextProvider>
}

type FormGroupProps = PropsWithChildren<NodeProps>
