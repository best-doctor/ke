import React, { FunctionComponentElement, PropsWithChildren, useCallback } from 'react'
import { FieldError, RecRoot, RootValueDesc, useRoot, useValue } from '@cdk/Forms'

import { NodeProps } from './types'

export function Group({ name, children }: GroupProps): FunctionComponentElement<GroupProps> {
  const { value, setValue } = useValue(name)

  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    throw new TypeError(`Form Group for name ${name} got "${JSON.stringify(value)}" but waited for dictionary`)
  }

  const handleChange = useCallback(
    (desc: RootValueDesc<RecRoot>) => {
      const arrErrors = Object.values(desc.errors)
      setValue({
        value: desc.value,
        errors: arrErrors.indexOf(null) < 0 ? (arrErrors.flat() as FieldError[]) : null,
      })
    },
    [setValue]
  )

  const { Root } = useRoot(value as Record<string | number, unknown>, handleChange)

  return <Root>{children}</Root>
}

type GroupProps = PropsWithChildren<NodeProps>
