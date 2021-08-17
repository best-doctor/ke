import { ComponentType, createElement } from 'react'

import { FieldProps, BaseFieldsBuilderProps } from './types'

export function fieldsBuilder(
  Field: ComponentType<FieldProps<unknown, unknown>>,
  { fields }: BaseFieldsBuilderProps
): [key: string | number, element: JSX.Element][] {
  return fields.map(({ control, name, ...controlProps }) => [
    name,
    createElement(Field, {
      as: control,
      name,
      ...controlProps,
    }),
  ])
}
