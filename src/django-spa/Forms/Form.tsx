import React, { ReactNode } from 'react'
import { FieldKey, useForm, FormData, RecordValidator } from '@cdk/Forms'

export function Form<K extends FieldKey, T>({ data, onFormChange, children, validator }: FormProps<K, T>): JSX.Element {
  const {
    valuesRoot: [Root, props],
    errorsRoot: [ErrorsRoot, errorsProps],
  } = useForm(data, onFormChange, validator)

  return (
    <Root {...props}>
      <ErrorsRoot {...errorsProps}>
        <form>{children}</form>
      </ErrorsRoot>
    </Root>
  )
}

interface FormProps<K extends FieldKey, T> {
  data: T
  onFormChange: (value: T, meta: Omit<FormData<K>, 'value'>) => void
  validator?: RecordValidator
  children: ReactNode
}
