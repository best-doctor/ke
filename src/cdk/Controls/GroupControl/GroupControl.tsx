import React, { PropsWithChildren, useCallback, useRef } from 'react'
import { useForm, FormData } from '@cdk/Forms'
import { isEqual } from '@utils/Types'

export function GroupControl({ value, onChange, children }: GroupControlProps): JSX.Element {
  const prevValueRef = useRef(value)
  prevValueRef.current = value
  const controlChange = useCallback(
    (formData: FormData<string>) => {
      if (!isEqual(prevValueRef.current, formData.value)) {
        onChange(formData.value)
      }
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
