import { RefObject, useCallback, useEffect, useRef } from 'react'
import { isEqual } from '@utils/Types'

import { useLeaf } from './ContextTree'

import { ControlRefProps, FieldData, FieldError, FieldValidator, FieldKey, FieldUpdater } from './types'

export function useField(
  key: FieldKey,
  controlRef?: RefObject<ControlRefProps>,
  validate?: FieldValidator
): UseFieldResult {
  const [{ value, errors, isTouched, inValidating }, updateLeaf] = useLeaf(key) as [
    FieldData,
    (updater: FieldUpdater) => void
  ]
  const defaultRef = useRef(null)

  useEffect(() => {
    updateLeaf((prev) => mergeField(prev, { relatedRef: controlRef || defaultRef }))
  }, [controlRef, updateLeaf])

  useEffect(() => {
    let rejected = false

    if (!validate) {
      updateLeaf((prev) => mergeField(prev, { inValidating: false, errors: null }))
    } else {
      updateLeaf((prev) => mergeField(prev, { inValidating: true }))
      validate(value).then((result) => {
        if (!rejected) {
          updateLeaf((prev) =>
            mergeField(prev, {
              value,
              errors: result.errors || null,
              inValidating: false,
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

  return isEqual(field, merged) && field.relatedRef === merged.relatedRef ? field : merged
}

interface UseFieldResult<T = unknown> {
  value: T
  onChange: (val: T) => void
  errors: readonly FieldError[] | null
  isTouched: boolean
  inValidating: boolean
}
