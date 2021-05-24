import { partial } from '@utils/Funcs'
import { useRecord } from './Record.hook'
import { useForm as genericUseForm } from './Form.hook'

export { useField } from './Field.hook'
export { useArray } from './Array.hook'
export { useRecord } from './Record.hook'
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

export const useForm = partial(genericUseForm, useRecord)
