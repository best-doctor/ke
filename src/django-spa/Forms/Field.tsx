import React, { ElementType, ReactElement, RefObject, useCallback, useRef } from 'react'
import { ForwardRef } from 'react-is'
import { ControlRefProps, useField, useFieldValidation, ValidationResult, Validator } from '@cdk/Forms'
import { makeWithLayout, PropsWithDefaultLayout } from '@cdk/Layouts'

import type { NodeProps } from './types'
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
    // isForwardRef from react-is only works for rendered components (i.e. elements),
    // so we use $$typeof of Component to check if it supports ref pass.
    const isComponentHasRef = ((Component as unknown) as { $$typeof: symbol }).$$typeof === ForwardRef

    return {
      Control: (
        <Component
          // Fix for warning: Function components cannot be given refs.
          {...(isComponentHasRef ? { ref: controlRef } : {})}
          value={value}
          onChange={handleChange}
          {...other}
        />
      ),
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

interface ControlProps<T> {
  value: T
  onChange: (val: T) => void
  ref: RefObject<ControlRefProps | undefined>
}

interface BaseFieldProps<T, P> extends NodeProps {
  as: ElementType<P & ControlProps<T>>
  validator?: Validator
}

type FieldProps<T, P> = BaseFieldProps<T, P> &
  Omit<P, keyof BaseFieldProps<T, P> | keyof ControlProps<T>> & {
    label?: ReactElement
  }
