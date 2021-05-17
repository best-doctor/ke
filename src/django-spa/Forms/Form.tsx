import React, { FunctionComponentElement, PropsWithChildren } from 'react'
import { RootValue, RootValueDesc, useRoot, Validator } from '@cdk/Forms'

export function Form<T extends RootValue>({
  value,
  onChange,
  children,
}: FormProps<T>): FunctionComponentElement<FormProps<T>> {
  const { Root } = useRoot(value, onChange)

  return (
    <Root>
      <form>{children}</form>
    </Root>
  )
}

type FormProps<T extends RootValue> = PropsWithChildren<{
  value: T
  onChange: (value: RootValueDesc<T>) => void
  validator?: Validator
}>
