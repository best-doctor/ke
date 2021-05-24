import { useCallback } from 'react'

import { FieldError, FieldKey, RecordData, FormData, FieldData } from './types'
import { useRecordRoot } from './ContextTree'

export function useForm<K extends FieldKey>(
  recordHook: (val: Record<K, unknown>, onChange: (val: RecordData<K>) => void) => ReturnType<typeof useRecordRoot>,
  value: Record<K, unknown>,
  onChange: (val: FormData<K>) => void
): ReturnType<typeof useRecordRoot> {
  const handleChange = useCallback(
    (record: RecordData<K>) => {
      console.log('form on change', 'record', record, 'form', {
        value: extractValue(record),
        errors: extractErrors(record),
        isTouched: !!Object.values(record).find((field) => (field as FieldData).isTouched),
        inValidating: !!Object.values(record).find((field) => (field as FieldData).inValidating),
        maxErrorLevel: null,
      })
      onChange({
        value: extractValue(record),
        errors: extractErrors(record),
        isTouched: !!Object.values(record).find((field) => (field as FieldData).isTouched),
        inValidating: !!Object.values(record).find((field) => (field as FieldData).inValidating),
        maxErrorLevel: null,
      })
    },
    [onChange]
  )
  console.log('form hook', value)
  return recordHook(value, handleChange)
}

function extractValue<K extends FieldKey>(data: RecordData<K>): Record<K, unknown> {
  return Object.fromEntries(Object.entries(data).map(([key, field]) => [key, (field as FieldData).value])) as Record<
    K,
    unknown
  >
}

function extractErrors<K extends FieldKey>(data: RecordData<K>): Record<K, FieldError[] | null> {
  return Object.fromEntries(Object.entries(data).map(([key, field]) => [key, (field as FieldData).errors])) as Record<
    K,
    FieldError[] | null
  >
}
