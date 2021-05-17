import React, { ElementType, RefObject, useRef } from 'react'
import { ControlRefProps, useField } from '@cdk/Forms'
import { makeWithLayout, PropsWithDefaultLayout } from '@cdk/Layouts'

import type { NodeProps } from './types'
import { Simple } from './Layouts'

export const Field = makeWithLayout(({ name, as, ...other }: FieldProps<unknown, ControlProps<unknown>>) => {
  const controlRef = useRef<ControlRefProps>()
  const { value, onChange } = useField(name, controlRef)

  // Don't found why, but type declaration necessary here https://github.com/microsoft/TypeScript/issues/28631#issuecomment-477240245
  const Component: ElementType = as
  return { Control: <Component ref={controlRef} value={value} onChange={onChange} {...other} /> }
}, Simple) as <T, P extends ControlProps<T>>(
  props: PropsWithDefaultLayout<FieldProps<T, P>, { Control: JSX.Element }>
) => JSX.Element

interface ControlProps<T> {
  value: T
  onChange: (val: T) => void
  ref: RefObject<ControlRefProps | undefined>
}

interface BaseFieldProps<T, P> extends NodeProps {
  as: ElementType<P & ControlProps<T>>
}

type FieldProps<T, P> = BaseFieldProps<T, P> & Omit<P, keyof BaseFieldProps<T, P> | keyof ControlProps<T>>
