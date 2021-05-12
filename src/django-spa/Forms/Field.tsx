import React, { ElementType } from 'react'
import { useField } from '@cdk/Forms'
import { makeWithLayout, PropsWithDefaultLayout } from '@cdk/Layouts'

import type { NodeProps } from './types'
import { Simple } from './Layouts'

export const Field = makeWithLayout(({ name, as, ...other }: FieldProps<unknown, ControlProps<unknown>>) => {
  const [field, setField] = useField(name)

  // Don't found why, but type declaration necessary here https://github.com/microsoft/TypeScript/issues/28631#issuecomment-477240245
  const Component: ElementType = as
  return { Control: <Component value={field} onChange={setField} {...other} /> }
}, Simple) as <T, P extends ControlProps<T>>(
  props: PropsWithDefaultLayout<FieldProps<T, P>, { Control: JSX.Element }>
) => JSX.Element

interface ControlProps<T> {
  value: T
  onChange: (val: T) => void
}

interface BaseFieldProps<T, P> extends NodeProps {
  as: ElementType<P & ControlProps<T>>
}

type FieldProps<T, P> = BaseFieldProps<T, P> & Omit<P, keyof BaseFieldProps<T, P> | keyof ControlProps<T>>
