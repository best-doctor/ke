import { RefObject, useCallback, useEffect } from 'react'
import { isEqual } from '@utils/Types'

import { ControlRefProps, FieldData, FieldKey, Updater } from './types'

export function useField(
  leafHook: (key: FieldKey) => [FieldData, (updater: Updater<FieldData>) => void],
  key: FieldKey,
  controlRef?: RefObject<ControlRefProps>
): UseFieldResult {
  const [{ value, isTouched }, updateLeaf] = leafHook(key)

  useEffect(() => {
    updateLeaf((prev) => mergeField(prev, { relatedRef: controlRef || null }))
  }, [controlRef, updateLeaf])

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
  }
}

function mergeField(field: FieldData, ext: Partial<FieldData>): FieldData {
  const merged = {
    ...field,
    ...ext,
  }

  return isEqual(field, merged) ? field : merged
}

export interface UseFieldResult<T = unknown> {
  value: T
  onChange: (val: T) => void
  isTouched: boolean
}
