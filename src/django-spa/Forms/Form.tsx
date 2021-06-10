import React, { ReactNode } from 'react'
import { FieldKey, useForm, FormData, RecordValidator } from '@cdk/Forms'

export function Form<K extends FieldKey>({ value, onChange, children, validator }: FormProps<K>): JSX.Element {
  const {
    valuesRoot: [Root, props],
    errorsRoot: [ErrorsRoot, errorsProps],
  } = useForm(value, onChange, validator)

  return (
    <Root {...props}>
      <ErrorsRoot {...errorsProps}>
        <form>{children}</form>
      </ErrorsRoot>
    </Root>
  )
}

interface FormProps<K extends FieldKey> {
  value: Record<K, unknown>
  onChange: (value: FormData<K>) => void
  validator?: RecordValidator
  children: ReactNode
}
