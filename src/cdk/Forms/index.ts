import { partial } from '@utils/Funcs'

import { useRecord } from './Fields'
import { useForm as genericUseForm } from './Form.hook'
import { useRecordValidation } from './Validation'

export const useForm = partial(genericUseForm, useRecord, useRecordValidation)

export { FormData } from './types'
export { RecordData, useRecord, useArray, useField, ArrayData, ControlRefProps, FieldKey } from './Fields'
export { useFieldValidation, useRecordValidation, ValidationResult, Validator, RecordValidator } from './Validation'
