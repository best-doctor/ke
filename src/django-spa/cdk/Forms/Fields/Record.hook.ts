import { useEffect, useState } from 'react'
import { isEqual } from '@utils/Types'

import { FieldData, FieldKey, RecordData, RootProviderDesc, Updater } from './types'

export function useRecord<K extends FieldKey>(
  rootHook: (record: RecordData<K>, onChange: (updater: Updater<RecordData<K>>) => void) => RootProviderDesc,
  value: Record<K, unknown>,
  onChange: (val: RecordData<K>) => void
): RootProviderDesc {
  const [record, setRecord] = useState(() => makeDefaultRecord(value))

  useEffect(() => {
    setRecord((prev) => updateRecord(prev, value))
  }, [value])

  useEffect(() => {
    onChange(record)
  }, [onChange, record])

  return rootHook(record, setRecord)
}

const defaultField: Omit<FieldData, 'value'> = {
  isTouched: false,
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
