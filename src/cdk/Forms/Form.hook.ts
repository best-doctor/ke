import { useCallback, useEffect, useState } from 'react'
import { isEqual } from '@utils/Types'

import { FieldKey, RecordData, FieldData, RootProviderDesc } from './Fields'
import { FormData } from './types'
import { RecordValidator } from './Validation'

export function useForm<K extends FieldKey>(
  useRecord: (val: Record<K, unknown>, onChange: (val: RecordData<K>) => void) => RootProviderDesc,
  useValidation: (
    v: Record<K, unknown>,
    validator: RecordValidator
  ) => { errorsRoot: RootProviderDesc; recursiveValidate: RecordValidator },
  value: Record<K, unknown>,
  onChange: (val: FormData<K>) => void,
  validator: RecordValidator
): UseFormResult {
  const { errorsRoot, recursiveValidate } = useValidation(value, validator)

  const [formValue, setFormValue] = useState((): FormData<K> => makeDefaultForm(value, recursiveValidate))

  useEffect(() => {
    onChange(formValue)
  }, [formValue, onChange])

  useEffect(() => {
    setFormValue((prev) =>
      value === prev.value && recursiveValidate === prev.validate ? prev : makeDefaultForm(value, recursiveValidate)
    )
  }, [value, recursiveValidate])

  const handleChange = useCallback(
    (record: RecordData<K>) => {
      setFormValue((prev) => {
        const changedValue = extract(record, 'value')
        const changed = {
          value: isEqual(prev.value, changedValue) ? prev.value : changedValue,
          relatedRefs: extract(record, 'relatedRef'),
          isTouched: !!Object.values(record).find((field) => (field as FieldData).isTouched),
          validate: isEqual(prev.value, changedValue) ? prev.validate : () => recursiveValidate(changedValue),
        }
        return isEqual(prev, changed) ? prev : changed
      })
    },
    [recursiveValidate]
  )

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

function makeDefaultForm<K extends FieldKey>(value: Record<K, unknown>, validator: RecordValidator): FormData<K> {
  return {
    value,
    relatedRefs: Object.fromEntries(Object.keys(value).map((key) => [key, null])) as Record<K, null>,
    isTouched: false,
    validate: () => validator(value),
  }
}

export interface UseFormResult {
  valuesRoot: RootProviderDesc
  errorsRoot: RootProviderDesc
}
