import { ComponentType, createElement } from 'react'

import { FieldProps, BaseFieldsBuilderProps } from './types'

export function fieldsBuilder(
  Field: ComponentType<FieldProps<unknown, unknown>>,
  { fields }: BaseFieldsBuilderProps
): { key: string | number; content: JSX.Element }[] {
  return fields.map(({ control, name, ...controlProps }) => ({
    key: name,
    content: createElement(Field, {
      as: control,
      name,
      ...controlProps,
    }),
  }))
}
