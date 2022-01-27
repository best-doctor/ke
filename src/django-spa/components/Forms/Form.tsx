import React, { PropsWithChildren } from 'react'
import { FieldKey, useForm } from '@cdk/Forms'

import { FormProps } from './types'

export function Form<K extends FieldKey, T>({
  data,
  onFormChange,
  children,
  validator,
}: PropsWithChildren<FormProps<K, T>>): JSX.Element {
  const {
    valuesRoot: [Root, props],
    errorsRoot: [ErrorsRoot, errorsProps],
  } = useForm(data, onFormChange, validator)

  return (
    <Root value={props.value}>
      <ErrorsRoot value={errorsProps.value}>
        <form>{children}</form>
      </ErrorsRoot>
    </Root>
  )
}
