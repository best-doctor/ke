import React, { FunctionComponentElement, ElementType } from 'react'
import { useField } from '@cdk/Forms'

import type { NodeProps } from './types'

export function Field<T, P extends ControlProps<T>>({
  name,
  as,
  ...other
}: FieldProps<T, P>): FunctionComponentElement<FieldProps<T, P>> {
  const [field, setField] = useField(name)

  // Don't found why, but type declaration necessary here https://github.com/microsoft/TypeScript/issues/28631#issuecomment-477240245
  const Component: ElementType = as
  return <Component value={field} onChange={setField} {...other} />
}

interface ControlProps<T> {
  value: T
  onChange: (val: T) => void
}

interface BaseFieldProps<T, P> extends NodeProps {
  as: ElementType<P & ControlProps<T>>
}

type FieldProps<T, P> = BaseFieldProps<T, P> & Omit<P, keyof BaseFieldProps<T, P> | keyof ControlProps<T>>
