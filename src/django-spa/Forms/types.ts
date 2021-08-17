import { ElementType, ReactElement, RefObject } from 'react'
import { ControlRefProps, FieldKey, FormData, RecordValidator, Validator } from '@cdk/Forms'

export interface NodeProps {
  name: string | number
}

export interface ControlProps<T> {
  value: T
  onChange: (val: T) => void
  ref: RefObject<ControlRefProps | undefined>
}

export type FieldProps<T, P> = BaseFieldProps<T, P> &
  Omit<P, keyof BaseFieldProps<T, P> | keyof ControlProps<T>> & {
    label?: ReactElement
  }

export interface FormProps<K extends FieldKey, T> {
  data: T
  onFormChange: (value: T, meta: Omit<FormData<K>, 'value'>) => void
  validator?: RecordValidator
}

export interface BaseFieldsBuilderProps {
  fields: FieldConfig[]
  children?: never
}

type FieldConfig<T = unknown, P = unknown> = Omit<FieldProps<T, P>, 'as'> & {
  control: FieldProps<T, P>['as']
}

interface BaseFieldProps<T, P> extends NodeProps {
  as: ElementType<P & ControlProps<T>>
  validator?: Validator
}
