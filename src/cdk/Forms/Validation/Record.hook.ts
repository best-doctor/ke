import { useCallback, useEffect, useState } from 'react'
import { isEqual } from '@utils/Types'

import { ValidationError, ValidationResult, ValidationState } from './Checks'
import { ErrorsData, ErrorsKey, RecordErrors, Updater, RootProviderDesc, RecordValidator } from './types'

export function useRecordValidation<K extends ErrorsKey>(
  useRoot: (record: RecordErrors<K>, onChange: (updater: Updater<RecordErrors<K>>) => void) => RootProviderDesc,
  useCheck: (
    validator: RecordValidator
  ) => ValidationState<Record<K, ValidationError[] | null>> & { validate: RecordValidator },
  value: Record<ErrorsKey, unknown>,
  validator?: RecordValidator
): UseRecordValidationResult {
  const [record, setRecord] = useState(() => makeDefaultRecord(value))

  const { validate, errors, inValidating, lastValidated } = useCheck(validator || defaultValidator)

  useEffect(() => {
    setRecord((prev) => {
      const prevKeys = Object.keys(prev)
      const notExistsErrorsKeys = Object.keys(errors || {}).filter((errorKey) => !prevKeys.includes(errorKey))
      if (notExistsErrorsKeys.length) {
        throw new TypeError(
          `Errors includes keys: "${notExistsErrorsKeys}", which not exists in value "${prevKeys}". Possible invalid validator.`
        )
      }
      const ext = Object.fromEntries(
        Object.entries(prev).map(([key, data]) => [
          key,
          {
            ...data,
            errors: errors ? errors[key as K] : null,
            inValidating,
            lastValidated: lastValidated ? (lastValidated as Record<ErrorsKey, unknown>)[key] : undefined,
          },
        ])
      ) as RecordErrors<K>
      return updateRecord(prev, ext)
    })
  }, [errors, inValidating, lastValidated])

  const sortedPairs = Object.entries(record)
    .sort(([a], [b]) => cmp(a, b))
    .map(([key, data]) => [key, data.validate] as [string, typeof data['validate']])

  const sortedKeys = sortedPairs.map(([key]) => key)
  const sortedFieldValidators = sortedPairs.map(([, fieldValidator]) => fieldValidator)
  const recursiveValidate = useCallback(
    async (v: unknown) => {
      if (!v || typeof v !== 'object') {
        throw new TypeError(`Try to validate not record type "${JSON.stringify(v)}"`)
      }

      const recordResult = await validate(v)
      const fieldResults = await Promise.all(
        sortedFieldValidators.map((fieldValidator, index) =>
          fieldValidator((v as Record<ErrorsKey, unknown>)[sortedKeys[index]])
        )
      )

      sortedKeys.forEach((fieldKey, index) => {
        const fieldResult = fieldResults[index]
        if (!recordResult[fieldKey] || recordResult[fieldKey].success) {
          recordResult[fieldKey] = fieldResult
        } else if (!fieldResult.success) {
          recordResult[fieldKey].errors = (recordResult[fieldKey].errors || []).concat(fieldResult.errors || [])
        }
      })

      return recordResult
    },
    // We depend on values not arrays
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [...sortedKeys, ...sortedFieldValidators, validate]
  )

  return {
    errorsRoot: useRoot(record, setRecord),
    recordValidate: validate,
    recursiveValidate,
  }
}

const defaultData: ErrorsData = {
  inValidating: false,
  errors: null,
  lastValidated: undefined,
  validate: () => Promise.resolve({ success: true }),
}

function defaultValidator(v: unknown): Promise<Record<string, ValidationResult>> {
  if (!v || typeof v !== 'object') {
    throw new TypeError(`Try to validate not record type "${JSON.stringify(v)}"`)
  }

  return Promise.resolve(Object.fromEntries(Object.keys(v as {}).map((key) => [key, { success: true }])))
}

function makeDefaultRecord<K extends ErrorsKey>(value: Record<K, unknown>): RecordErrors<K> {
  return Object.fromEntries(Object.keys(value).map((key) => [key, { ...defaultData }])) as RecordErrors<K>
}

function updateRecord<K extends ErrorsKey>(prev: RecordErrors<K>, ext: RecordErrors<K>): RecordErrors<K> {
  const updated = Object.fromEntries(
    Object.entries(prev).map(([key, errorsData]) => [
      key,
      key in ext && isEqual(errorsData, ext[key as K]) ? errorsData : ext[key as K],
    ])
  ) as RecordErrors<K>

  return isEqual(prev, updated) ? prev : updated
}

export interface UseRecordValidationResult {
  errorsRoot: RootProviderDesc
  recordValidate: (v: unknown) => Promise<Record<string, ValidationResult>>
  recursiveValidate: (v: unknown) => Promise<Record<string, ValidationResult>>
}

function cmp(a: string, b: string): number {
  if (a > b) return 1
  if (a < b) return -1
  return 0
}
