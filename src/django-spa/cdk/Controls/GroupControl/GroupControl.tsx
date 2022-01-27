import React, { PropsWithChildren, useCallback, useRef } from 'react'
import { isEqual } from '@utils/Types'
import { useForm } from '@cdk/Forms'

export function GroupControl({ value, onChange, children }: GroupControlProps): JSX.Element {
  const prevValueRef = useRef(value)
  prevValueRef.current = value
  const controlChange = useCallback(
    (formValue: Record<string | number, unknown>) => {
      if (!isEqual(prevValueRef.current, formValue)) {
        onChange(formValue)
      }
    },
    [onChange]
  )

  const {
    valuesRoot: [Root, props],
    errorsRoot: [ErrorsRoot, errorsProps],
  } = useForm(value, controlChange)

  return (
    <Root value={props.value}>
      <ErrorsRoot value={errorsProps.value}>{children}</ErrorsRoot>
    </Root>
  )
}

type GroupControlProps = PropsWithChildren<{
  value: Record<string | number, unknown>
  onChange: (val: Record<string | number, unknown>) => void
}>
