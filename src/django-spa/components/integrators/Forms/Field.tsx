import React, { ElementType, useCallback, useRef } from 'react'
import { ControlRefProps, useField, useFieldValidation } from '@cdk/Forms'
import { makeWithLayout, PropsWithDefaultLayout } from '@cdk/Layouts'

import type { ControlProps, FieldProps } from './types'
import { Simple } from './Layouts'
import { Label } from '../../../../common/components/Label'

export const Field = makeWithLayout(
  ({ name, as, validator, label, isRequired, ...other }: FieldProps<unknown, ControlProps<unknown>>) => {
    const controlRef = useRef<ControlRefProps>(null)
    const { value, onChange } = useField(name, controlRef)
    const { errors, validate } = useFieldValidation(name, value, validator)

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
      Control: <Component ref={controlRef} value={value} onChange={handleChange} name={name} {...other} />,
      Errors: errors && errors.length ? errors[0].message : '',
      Label: label && (
        <Label isRequired={isRequired} mb={2} display="inline-block">
          {label}
        </Label>
      ),
    }
  },
  Simple
) as <T, P extends ControlProps<T>>(
  props: PropsWithDefaultLayout<FieldProps<T, P>, { Control: JSX.Element }>
) => JSX.Element
