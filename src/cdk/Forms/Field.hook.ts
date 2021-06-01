import { RefObject, useCallback, useEffect } from 'react'
import { isEqual } from '@utils/Types'

import { useLeaf } from './ContextTree'

import { ControlRefProps, FieldData, FieldError, FieldValidator, FieldKey, Updater } from './types'

export function useField(
  key: FieldKey,
  controlRef?: RefObject<ControlRefProps>,
  validate?: FieldValidator
): UseFieldResult {
  const [{ value, errors, isTouched, inValidating }, updateLeaf] = useLeaf(key) as [
    FieldData,
    (updater: Updater<FieldData>) => void
  ]

  useEffect(() => {
    updateLeaf((prev) => mergeField(prev, { relatedRef: controlRef || null }))
  }, [controlRef, updateLeaf])

  useEffect(() => {
    let rejected = false

    if (validate) {
      updateLeaf((prev) => mergeField(prev, { inValidating: true, validated: false }))
      validate(value).then((result) => {
        if (!rejected) {
          updateLeaf((prev) =>
            mergeField(prev, {
              value,
              errors: result.errors || null,
              inValidating: false,
              validated: true,
            })
          )
        }
      })
    }

    return () => {
      rejected = true
    }
  }, [value, validate, updateLeaf])

  const onChange = useCallback(
    (val) => {
      updateLeaf((prev) =>
        mergeField(prev, {
          value: val,
          isTouched: true,
          validated: false,
        })
      )
    },
    [updateLeaf]
  )

  return {
    value,
    onChange,
    isTouched,
    errors,
    inValidating,
  }
}

function mergeField(field: FieldData, ext: Partial<FieldData>): FieldData {
  const merged = {
    ...field,
    ...ext,
  }

  return isEqual(field, merged) ? field : merged
}

interface UseFieldResult<T = unknown> {
  value: T
  onChange: (val: T) => void
  errors: readonly FieldError[] | null
  isTouched: boolean
  inValidating: boolean
}
