import React, { ReactNode, useCallback } from 'react'
import { RecordData, useField, useRecord, RecordValidator, useFieldValidation, useRecordValidation } from '@cdk/Forms'

import { NodeProps } from './types'

export function Group({ name, children, validator }: GroupProps): JSX.Element {
  const { value, onChange } = useField(name)

  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    throw new TypeError(`Form Group for name ${name} got "${JSON.stringify(value)}" but waited for dictionary`)
  }

  const {
    errorsRoot: [ErrorsRoot, errorsProps],
    recordValidate,
    recursiveValidate,
  } = useRecordValidation(value, validator)

  const handleChange = useCallback(
    async (data: RecordData) => {
      const changedValue = Object.fromEntries(Object.entries(data).map(([key, field]) => [key, field.value]))
      await recordValidate(changedValue)
      onChange(changedValue)
    },
    [onChange, recordValidate]
  )

  const [Root, props] = useRecord(value as Record<string | number, unknown>, handleChange)

  const fieldValidate = useCallback(
    async (v: unknown) => {
      const result = await recursiveValidate(v)
      const success = Object.values(result).every((fieldResult) => fieldResult.success)

      if (success) {
        return { success }
      }

      return {
        success,
        errors: Object.values(result)
          .map((fieldResult) => fieldResult.errors || [])
          .flat(),
      }
    },
    [recursiveValidate]
  )

  useFieldValidation(name, value, fieldValidate)

  return (
    <Root value={props.value}>
      <ErrorsRoot value={errorsProps.value}>{children}</ErrorsRoot>
    </Root>
  )
}

interface GroupProps extends NodeProps {
  validator?: RecordValidator
  children: ReactNode
}
