import { useEffect, useState } from 'react'
import { isEqual } from '@utils/Types'

import { FieldData, FieldKey, RecordData, RecordValidator, RootProviderDesc, Updater } from './types'

export function useRecord<K extends FieldKey>(
  rootHook: (record: RecordData<K>, onChange: (updater: Updater<RecordData<K>>) => void) => RootProviderDesc,
  value: Record<K, unknown>,
  onChange: (val: RecordData<K>) => void,
  validate?: RecordValidator<K>
): RootProviderDesc {
  const [record, setRecord] = useState(() => makeDefaultRecord(value))

  useEffect(() => {
    setRecord((prev) => updateRecord(prev, value))
  }, [value])

  useEffect(() => {
    onChange(record)
  }, [onChange, record])

  useEffect(() => {
    let rejected = false
    if (validate) {
      setRecord((prev) => updateRecordFields(prev, { inValidating: true, validated: false }))
      validate(value).then((result) => {
        if (!rejected) {
          const forMerge = Object.fromEntries(
            Object.keys(value).map((key) => [
              key,
              {
                inValidating: false,
                validated: true,
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

  return rootHook(record, setRecord)
}

const defaultField: Omit<FieldData, 'value'> = {
  errors: null,
  isTouched: false,
  inValidating: false,
  validated: false,
  relatedRef: null,
}

function makeDefaultRecord<K extends FieldKey>(value: Record<K, unknown>): RecordData<K> {
  return Object.fromEntries(
    Object.entries(value).map(([key, item]) => [key, { ...defaultField, value: item }])
  ) as RecordData<K>
}

function updateRecord<K extends FieldKey>(record: RecordData, value: Record<K, unknown>): RecordData<K> {
  const updated = Object.fromEntries(
    Object.entries(value).map(([key, item]) => [
      key,
      key in record && isEqual(item, record[key].value) ? record[key] : { ...defaultField, value: item },
    ])
  ) as RecordData<K>

  return isEqual(updated, record) ? record : updated
}

function updateRecordFields<K extends FieldKey>(baseRecord: RecordData<K>, ext: Partial<FieldData>): RecordData<K> {
  return mergeRecord(
    baseRecord,
    Object.fromEntries(Object.keys(baseRecord).map((key) => [key, ext])) as Record<K, Partial<FieldData>>
  )
}

function mergeRecord<K extends FieldKey>(baseRecord: RecordData<K>, ext: Record<K, Partial<FieldData>>): RecordData<K> {
  const updated = Object.fromEntries(
    Object.entries(ext).map(([key, extField]) => {
      const baseField = baseRecord[key as K]
      const updatedField = { ...baseField, ...(extField as Partial<FieldData>) }
      return [key, isEqual(baseField, updatedField) ? baseField : updatedField]
    })
  ) as RecordData<K>

  return isEqual(baseRecord, updated) ? baseRecord : updated
}
