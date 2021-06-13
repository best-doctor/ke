import { useCallback, useEffect, useState } from 'react'
import { isEqual } from '@utils/Types'

import { FieldKey, RecordData, FieldData, RootProviderDesc } from './Fields'
import { FormData, ValueData } from './types'
import { RecordValidator } from './Validation'

export function useForm<K extends FieldKey>(
  useRecord: (val: Record<K, unknown>, onChange: (val: RecordData<K>) => void) => RootProviderDesc,
  useValidation: (
    v: Record<K, unknown>,
    validator?: RecordValidator
  ) => { errorsRoot: RootProviderDesc; recursiveValidate: RecordValidator },
  value: Record<K, unknown>,
  onFormChange: (val: FormData<K>) => void,
  validator?: RecordValidator
): UseFormResult {
  const { errorsRoot, recursiveValidate } = useValidation(value, validator)

  const [formValue, setFormValue] = useState((): ValueData<K> => makeDefaultForm(value))

  useEffect(() => {
    onFormChange({ ...formValue, validate: () => recursiveValidate(formValue.value) })
  }, [formValue, recursiveValidate, onFormChange])

  useEffect(() => {
    setFormValue((prev) => (value === prev.value ? prev : replaceFormValue(prev, value)))
  }, [value])

  const handleChange = useCallback((record: RecordData<K>) => {
    setFormValue((prev) => {
      const changedValue = extract(record, 'value')
      const changed = {
        value: isEqual(prev.value, changedValue) ? prev.value : changedValue,
        relatedRefs: extract(record, 'relatedRef'),
        isTouched: !!Object.values(record).find((field) => (field as FieldData).isTouched),
      }
      return isEqual(prev, changed) ? prev : changed
    })
  }, [])

  return {
    valuesRoot: useRecord(value, handleChange),
    errorsRoot,
  }
}

function extract<K extends FieldKey, FK extends keyof FieldData>(
  data: RecordData<K>,
  fieldKey: FK
): Record<K, FieldData[FK]> {
  return Object.fromEntries(
    Object.entries(data).map(([key, field]) => [key, (field as FieldData)[fieldKey]])
  ) as Record<K, FieldData[FK]>
}

function makeDefaultForm<K extends FieldKey>(value: Record<K, unknown>): ValueData<K> {
  return {
    value,
    relatedRefs: Object.fromEntries(Object.keys(value).map((key) => [key, null])) as Record<K, null>,
    isTouched: false,
  }
}

function replaceFormValue<K extends FieldKey>(prev: ValueData<FieldKey>, value: Record<K, unknown>): ValueData<K> {
  const replaced = {
    value,
    relatedRefs: Object.fromEntries(Object.keys(value).map((key) => [key, prev.relatedRefs[key] || null])) as Record<
      K,
      null
    >,
    isTouched: false,
  }

  return isEqual(prev, replaced) ? prev : replaced
}

export interface UseFormResult {
  valuesRoot: RootProviderDesc
  errorsRoot: RootProviderDesc
}
