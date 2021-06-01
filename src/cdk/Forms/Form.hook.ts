import { useCallback, useEffect, useState } from 'react'
import { isEqual } from '@utils/Types'

import { FieldKey, RecordData, FormData, FieldData, RootProviderDesc, RecordValidator, FieldError } from './types'

export function useForm<K extends FieldKey>(
  recordHook: (
    val: Record<K, unknown>,
    onChange: (val: RecordData<K>) => void,
    validate?: RecordValidator<K>
  ) => RootProviderDesc,
  value: Record<K, unknown>,
  onChange: (val: FormData<K>) => void,
  validate?: RecordValidator<K>
): RootProviderDesc {
  const [formValue, setFormValue] = useState((): FormData<K> => makeDefaultForm(value))

  useEffect(() => {
    onChange(formValue)
  }, [formValue, onChange])

  useEffect(() => {
    setFormValue((prev) => (value === prev.value ? prev : makeDefaultForm(value)))
  }, [value])

  const handleChange = useCallback((record: RecordData<K>) => {
    setFormValue((prev) => {
      const changedErrors = extract(record, 'errors')
      const changedValue = extract(record, 'value')
      const changed = {
        value: isEqual(prev.value, changedValue) ? prev.value : changedValue,
        errors: changedErrors,
        relatedRefs: extract(record, 'relatedRef'),
        isTouched: !!Object.values(record).find((field) => (field as FieldData).isTouched),
        inValidating: !!Object.values(record).find((field) => (field as FieldData).inValidating),
        validated: Object.values(record).every((field) => (field as FieldData).validated),
        maxErrorLevel: Math.max(
          ...Object.values(changedErrors)
            .filter(Boolean)
            .flat()
            .map((err) => (err as FieldError).level),
          Number.MIN_SAFE_INTEGER
        ),
      }
      return isEqual(prev, changed) ? prev : changed
    })
  }, [])

  return recordHook(value, handleChange, validate)
}

function extract<K extends FieldKey, FK extends keyof FieldData>(
  data: RecordData<K>,
  fieldKey: FK
): Record<K, FieldData[FK]> {
  return Object.fromEntries(
    Object.entries(data).map(([key, field]) => [key, (field as FieldData)[fieldKey]])
  ) as Record<K, FieldData[FK]>
}

function makeDefaultForm<K extends FieldKey>(value: Record<K, unknown>): FormData<K> {
  return {
    value,
    errors: Object.fromEntries(Object.keys(value).map((key) => [key, null])) as Record<K, null>,
    relatedRefs: Object.fromEntries(Object.keys(value).map((key) => [key, null])) as Record<K, null>,
    isTouched: false,
    inValidating: false,
    validated: false,
    maxErrorLevel: null,
  }
}
