import { useCallback, useEffect, useState } from 'react'

import { ArrayData, FieldData, FieldKey, RootProviderDesc } from './types'
import { useArrayRoot } from './ContextTree'

export function useArray<T>(
  value: T[],
  onChange: (val: ArrayData<T>) => void,
  getKey: (item: T) => FieldKey
): RootProviderDesc {
  const [array, setArray] = useState(() => makeDefaultArrayData(value))

  useEffect(() => {
    setArray((prev) => updateArrayData(prev, value, getKey))
  }, [value, getKey])

  const getFieldKey = useCallback((field: FieldData<T>) => getKey(field.value), [getKey])

  return useArrayRoot<FieldData<T>>(array, onChange, getFieldKey) as RootProviderDesc
}

const defaultField: Omit<FieldData, 'value'> = {
  errors: null,
  isTouched: false,
  inValidating: false,
  relatedRef: {
    current: null,
  },
}

function makeDefaultArrayData<T>(value: T[]): ArrayData<T> {
  return value.map((item) => ({ ...defaultField, value: item }))
}

function updateArrayData<T>(data: ArrayData<T>, value: T[], getKey: (item: T) => FieldKey): ArrayData<T> {
  if (data.length !== value.length || data.find((field, index) => field.value !== value[index])) {
    const prevMap = new Map(data.map((field) => [getKey(field.value), field]))

    return value.map((item) => {
      const prevField = prevMap.get(getKey(item))
      return {
        ...defaultField,
        ...prevField,
        value: item,
      }
    })
  }

  return data
}
