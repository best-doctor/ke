import React, { PropsWithChildren, useCallback } from 'react'
import { useForm, FormData } from '@cdk/Forms'

export function GroupControl({ value, onChange, children }: GroupControlProps): JSX.Element {
  const controlChange = useCallback(
    (formData: FormData<string>) => {
      onChange(formData.value)
    },
    [onChange]
  )

  const {
    valuesRoot: [Root, props],
    errorsRoot: [ErrorsRoot, errorsProps],
  } = useForm(value, controlChange)

  return (
    <Root {...props}>
      <ErrorsRoot {...errorsProps}>{children}</ErrorsRoot>
    </Root>
  )
}

type GroupControlProps = PropsWithChildren<{
  value: Record<string | number, unknown>
  onChange: (val: Record<string | number, unknown>) => void
}>
