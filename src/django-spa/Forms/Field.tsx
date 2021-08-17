import React, { ElementType, useCallback, useRef } from 'react'
import { ControlRefProps, useField, useFieldValidation, ValidationResult } from '@cdk/Forms'
import { makeWithLayout, PropsWithDefaultLayout } from '@cdk/Layouts'

import type { ControlProps, FieldProps } from './types'
import { Simple } from './Layouts'

export const Field = makeWithLayout(
  ({ name, as, validator, label, ...other }: FieldProps<unknown, ControlProps<unknown>>) => {
    const controlRef = useRef<ControlRefProps>(null)
    const { value, onChange } = useField(name, controlRef)
    const { errors, validate } = useFieldValidation(name, value, validator || defaultValidator)

    const handleChange = useCallback(
      async (v: unknown) => {
        await validate(v)
        onChange(v)
      },
      [onChange, validate]
    )

    // Don't found why, but type declaration necessary here https://github.com/microsoft/TypeScript/issues/28631#issuecomment-477240245
    const Component: ElementType = as

    return {
      Control: <Component ref={controlRef} value={value} onChange={handleChange} {...other} />,
      Errors: errors && errors.length ? errors[0].message : '',
      Label: label,
    }
  },
  Simple
) as <T, P extends ControlProps<T>>(
  props: PropsWithDefaultLayout<FieldProps<T, P>, { Control: JSX.Element }>
) => JSX.Element

function defaultValidator(): Promise<ValidationResult> {
  return Promise.resolve({ success: true })
}
