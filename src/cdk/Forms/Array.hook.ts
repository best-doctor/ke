import { useCallback, useEffect, useState } from 'react'
import { isEqual } from '@utils/Types'

import { ArrayData, ArrayValidator, FieldData, FieldKey, RootProviderDesc, Updater } from './types'

export function useArray<T>(
  arrayHook: (
    arr: FieldData<T>[],
    onChange: (updater: Updater<FieldData<T>[]>) => void,
    getKey: (item: FieldData<T>, index: number) => string | number
  ) => RootProviderDesc,
  value: T[],
  onChange: (val: ArrayData<T>) => void,
  getKey: (item: T, index: number) => FieldKey,
  validate?: ArrayValidator
): RootProviderDesc {
  const [array, setArray] = useState(() => makeDefaultArray(value))

  useEffect(() => {
    setArray((prev) => updateArray(prev, value, getKey))
  }, [value, getKey])

  useEffect(() => {
    onChange(array)
  }, [onChange, array])

  useEffect(() => {
    let rejected = false
    if (validate) {
      setArray((prev) => updateArrayFields(prev, { inValidating: true, validated: false }))
      validate(value).then((result) => {
        if (!rejected) {
          const forMerge = Array(value.length)
            .fill(null)
            .map((_, index) => ({
              inValidating: false,
              validated: true,
              errors: result[index]?.errors || null,
            }))
          setArray((prev) => mergeArray(prev, forMerge))
        }
      })
    }

    return () => {
      rejected = true
    }
  }, [value, validate])

  const getFieldKey = useCallback((field: FieldData<T>, index: number) => getKey(field.value, index), [getKey])

  return arrayHook(array, setArray, getFieldKey)
}

const defaultField: Omit<FieldData, 'value'> = {
  errors: null,
  isTouched: false,
  inValidating: false,
  validated: false,
  relatedRef: null,
}

function makeDefaultArray<T>(value: T[]): ArrayData<T> {
  return value.map((item) => ({ ...defaultField, value: item }))
}

function updateArray<T>(array: ArrayData<T>, value: T[], getKey: (item: T, index: number) => FieldKey): ArrayData<T> {
  const map = new Map(array.map((field, index) => [getKey(field.value, index), field]))
  const updated = value.map((item, number) => {
    const key = getKey(item, number)
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return map.has(key) && isEqual(map.get(key)!.value, item) ? map.get(key)! : { ...defaultField, value: item }
  })

  return isEqual(array, updated) ? array : updated
}

function updateArrayFields<T>(baseArray: ArrayData<T>, changes: Partial<FieldData>): ArrayData<T> {
  return mergeArray(baseArray, Array(baseArray.length).fill(changes))
}

function mergeArray<T>(baseArray: ArrayData<T>, ext: Partial<FieldData>[]): ArrayData<T> {
  const updated = ext.map((extField, index) => {
    const baseField = baseArray[index]
    const updatedField = { ...baseArray[index], ...extField }
    return isEqual(baseField, updatedField) ? baseField : updatedField
  }) as ArrayData<T>

  return isEqual(baseArray, updated) ? baseArray : updated
}
