import React, { ReactNode } from 'react'
import { FieldKey, useForm, FormData, RecordValidator } from '@cdk/Forms'

export function Form<K extends FieldKey>({ value, onChange, children, validator }: FormProps<K>): JSX.Element {
  const [Root, props] = useForm(value, onChange, validator)

  return (
    <Root {...props}>
      <form>{children}</form>
    </Root>
  )
}

interface FormProps<K extends FieldKey> {
  value: Record<K, unknown>
  onChange: (value: FormData<K>) => void
  validator?: RecordValidator<string | number>
  children: ReactNode
}
