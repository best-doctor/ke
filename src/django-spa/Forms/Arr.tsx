import React, { PropsWithChildren, ReactNode, useCallback } from 'react'
import { useArray, useField, ArrayData, useArrayValidation, ArrayValidator, useFieldValidation } from '@cdk/Forms'

import type { NodeProps } from './types'

export function Arr({ name, getKey, validator, children: makeNodeItem }: ArrProps): JSX.Element {
  const { value, onChange } = useField(name)

  if (!Array.isArray(value)) {
    throw new TypeError(`Form Array for name ${name} got ${typeof value} but waited for array`)
  }

  const {
    errorsRoot: [ErrorsRoot, errorsProps],
    arrayValidate,
    recursiveValidate,
  } = useArrayValidation(value, validator)

  const handleChange = useCallback(
    async (arrData: ArrayData) => {
      const changedValue = arrData.map((field) => field.value)
      await arrayValidate(changedValue)
      onChange(changedValue)
    },
    [onChange, arrayValidate]
  )

  const [Root, props] = useArray(value, handleChange, getKey)

  const fieldValidate = useCallback(
    async (v: unknown) => {
      const result = await recursiveValidate(v)
      const success = result.every((fieldResult) => fieldResult.success)

      if (success) {
        return { success }
      }

      return {
        success,
        errors: result.map((fieldResult) => fieldResult.errors || []).flat(),
      }
    },
    [recursiveValidate]
  )

  useFieldValidation(name, value, fieldValidate)

  return (
    <Root {...props}>
      <ErrorsRoot {...errorsProps}>
        {value.map((item: unknown, index) => (
          <ArrItem key={getKey(item, index)}>{makeNodeItem(item, index)}</ArrItem>
        ))}
      </ErrorsRoot>
    </Root>
  )
}

function ArrItem({ children }: PropsWithChildren<{}>): JSX.Element {
  return <>{children}</>
}

interface ArrProps extends NodeProps {
  getKey: (item: unknown, index: number) => string | number
  validator?: ArrayValidator
  children: (val: any, index: number) => ReactNode
}
