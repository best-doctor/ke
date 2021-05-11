import React, { FunctionComponentElement, PropsWithChildren } from 'react'
import { FormValue, useRoot } from '@cdk/Forms'

export function Form<T extends FormValue>({
  value,
  onChange,
  children,
}: FormProps<T>): FunctionComponentElement<FormProps<T>> {
  const { root: Root } = useRoot(value, onChange)

  return (
    <Root>
      <form>{children}</form>
    </Root>
  )
}

type FormProps<T extends FormValue> = PropsWithChildren<{
  value: T
  onChange: (value: T) => void
}>
