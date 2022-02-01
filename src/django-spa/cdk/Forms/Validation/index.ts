import { partial } from '@utils/funcs'

import { useFieldValidation as fieldValidationGeneric } from './Field.hook'
import { useRecordValidation as recordValidationGeneric } from './Record.hook'
import { useArrayValidation as arrayValidationGeneric } from './Array.hook'
import { useErrorsArray, useErrorsLeaf, useErrorsRecord } from './ErrorsTree'
import { useArrayCheck, useRecordCheck, useValueCheck } from './Checks'
import { ErrorsData, ErrorsKey, Updater } from './types'

export const useFieldValidation = partial(
  fieldValidationGeneric,
  useErrorsLeaf as (key: ErrorsKey) => [ErrorsData, (updater: Updater<ErrorsData>) => void],
  useValueCheck
)

export const useRecordValidation = partial(recordValidationGeneric, useErrorsRecord, useRecordCheck)

export const useArrayValidation = partial(arrayValidationGeneric, useErrorsArray, useArrayCheck)

export { ValidationError, ValidationResult } from './Checks'

export { Validator, RecordValidator, ArrayValidator } from './types'
