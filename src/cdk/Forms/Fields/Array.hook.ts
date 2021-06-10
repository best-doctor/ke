import { useCallback, useEffect, useState } from 'react'
import { isEqual } from '@utils/Types'

import { ArrayData, FieldData, FieldKey, RootProviderDesc, Updater } from './types'

export function useArray<T>(
  arrayHook: (
    arr: FieldData<T>[],
    onChange: (updater: Updater<FieldData<T>[]>) => void,
    getKey: (item: FieldData<T>, index: number) => string | number
  ) => RootProviderDesc,
  value: T[],
  onChange: (val: ArrayData<T>) => void,
  getKey: (item: T, index: number) => FieldKey
): RootProviderDesc {
  const [array, setArray] = useState(() => makeDefaultArray(value))

  useEffect(() => {
    setArray((prev) => updateArray(prev, value, getKey))
  }, [value, getKey])

  useEffect(() => {
    onChange(array)
  }, [onChange, array])

  const getFieldKey = useCallback((field: FieldData<T>, index: number) => getKey(field.value, index), [getKey])

  return arrayHook(array, setArray, getFieldKey)
}

const defaultField: Omit<FieldData, 'value'> = {
  isTouched: false,
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
