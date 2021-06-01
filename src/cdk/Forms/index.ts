import { partial } from '@utils/Funcs'

import { useArrayRoot, useRecordRoot } from './ContextTree'
import { useRecord as genericUseRecord } from './Record.hook'
import { useForm as genericUseForm } from './Form.hook'
import { useArray as genericUseArray } from './Array.hook'

export { useField } from './Field.hook'
export {
  ControlRefProps,
  FieldKey,
  RecordData,
  ArrayData,
  FormData,
  FieldData,
  FieldError,
  FieldValidator,
  RecordValidator,
  ArrayValidator,
} from './types'

export const useRecord = partial(genericUseRecord, useRecordRoot)
export const useForm = partial(genericUseForm, useRecord)
export const useArray = partial(genericUseArray, useArrayRoot)
