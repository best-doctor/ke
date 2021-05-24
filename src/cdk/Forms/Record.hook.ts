import { useEffect, useState } from 'react'
import { isEqual } from '@utils/Types'

import { FieldData, FieldKey, RecordData, RecordValidator, RootProviderDesc } from './types'
import { useRecordRoot } from './ContextTree'

export function useRecord<K extends FieldKey>(
  value: Record<K, unknown>,
  onChange: (val: RecordData<K>) => void,
  validate?: RecordValidator<K>
): RootProviderDesc {
  const [record, setRecord] = useState(() => makeDefaultRecordData(value))

  useEffect(() => {
    setRecord((prev) => updateRecordValue(prev, value))
  }, [value])

  useEffect(() => {
    let rejected = false
    if (validate) {
      setRecord((prev) => updateRecordFields(prev, { inValidating: true }))
      validate(value).then((result) => {
        if (!rejected) {
          const forMerge = Object.fromEntries(
            Object.keys(value).map((key) => [
              key,
              {
                inValidating: false,
                errors: result[key as K]?.errors || null,
              },
            ])
          ) as Record<K, Partial<FieldData>>
          setRecord((prev) => mergeRecord(prev, forMerge))
        }
      })
    }

    return () => {
      rejected = true
    }
  }, [value, validate])
  return useRecordRoot(record, onChange)
}

const defaultField: Omit<FieldData, 'value'> = {
  errors: null,
  isTouched: false,
  inValidating: false,
  relatedRef: {
    current: null,
  },
}

function makeDefaultRecordData<K extends FieldKey>(value: Record<K, unknown>): RecordData<K> {
  return Object.fromEntries(
    Object.entries(value).map(([key, item]) => [key, { ...defaultField, value: item }])
  ) as RecordData<K>
}

function updateRecordValue<K extends FieldKey>(data: RecordData, value: Record<K, unknown>): RecordData<K> {
  if (
    Object.keys(data).length !== Object.keys(value).length ||
    Object.entries(value).find(([key, val]) => !isEqual(data[key]?.value, val))
  ) {
    return Object.fromEntries(
      Object.entries(value).map(([key, val]) => {
        const prevField = data[key]
        return [key, { ...defaultField, ...prevField, value: val }]
      })
    ) as RecordData<K>
  }

  return data
}

function updateRecordFields<K extends FieldKey>(data: RecordData<K>, ext: Partial<FieldData>): RecordData<K> {
  return mergeRecord(
    data,
    Object.fromEntries(Object.keys(data).map((key) => [key, ext])) as Record<K, Partial<FieldData>>
  )
}

function mergeRecord<K extends FieldKey>(data: RecordData<K>, ext: Record<K, Partial<FieldData>>): RecordData<K> {
  const updatedFields = Object.entries(ext).reduce((acc, [key, extField]) => {
    const field = data[key as K]
    const updated = { ...field, ...(extField as Partial<FieldData>) }
    if (!isEqual(field, updated)) {
      return {
        ...acc,
        [key]: updated,
      }
    }
    return acc
  }, {} as Partial<RecordData<K>>)

  return Object.keys(updatedFields).length ? { ...data, ...updatedFields } : data
}
