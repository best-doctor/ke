import React, { FunctionComponentElement, PropsWithChildren, useState, useCallback, useEffect } from 'react'
import { usePropState } from '@cdk/Hooks'

import type { FormsContextData } from './types'
import { FormsContextProvider } from './Forms.context'

export function Form<T extends FormsContextData>({
  value,
  onChange,
  children,
  validators,
}: FormProps<T>): FunctionComponentElement<FormProps<T>> {
  const [formData, setFormData] = usePropState(value)
  const [formStatus, setFormStatus] = useState({ isValid: true })

  useEffect(() => {
    let isFormValid = true
    const statusValue: { [Key in keyof T]: FormStatusValue } = {}
    Object.entries(formData).forEach(([fieldName, fieldValue]) => {
      const validationErrors: string[] = []
      let isFieldValid = true
      if (validators && fieldName in validators) {
        const fieldValidators = validators[fieldName as keyof T] as Validator<T>
        const syncValidators = fieldValidators.sync
        const asyncValidators = fieldValidators.async

        if (syncValidators && Array.isArray(syncValidators)) {
          syncValidators.forEach(({ check, message }) => {
            if (!check(fieldValue, formData)) {
              isFormValid = false
              isFieldValid = false
              validationErrors.push(message)
            }
          })
        }
        if (asyncValidators && Array.isArray(asyncValidators)) {
          asyncValidators.forEach(({ check, message }) => {
            check(fieldValue, formData).then(
              (isValid) => {
                if (!isValid) {
                  isFormValid = false
                  isFieldValid = false
                  validationErrors.push(message)
                }
              },
              () => {}
            )
          })
        }
      }
      statusValue[fieldName as keyof T] = {
        value: fieldValue,
        isValid: isFieldValid,
        errors: validationErrors,
      }
    })
    const status: FormStatus<T> = { isValid: isFormValid, value: statusValue }
    setFormStatus(status)
  }, [formData, setFormStatus, validators])

  const handleChange = useCallback(
    (val: T) => {
      setFormData(val)
      onChange(val, formStatus)
    },
    [onChange, setFormData, formStatus]
  )

  return (
    <FormsContextProvider value={[formData, handleChange as (val: FormsContextData) => void]}>
      <form>{children}</form>
    </FormsContextProvider>
  )
}

type FormProps<Value extends FormsContextData> = PropsWithChildren<{
  value: Value
  onChange: (val: Value, status: FormStatus<Value>) => void
  validators?: {
    [K in keyof Value]: Validator<Value>
  }
}>

interface Validator<Full> {
  sync?: { check: (val: unknown, full: Full) => boolean; message: string }[]
  async?: { check: (val: unknown, full: Full) => Promise<boolean>; message: string }[]
}

interface FormStatusValue {
  value: unknown
  isValid: boolean
  errors: string[]
}
interface FormStatus<FormValue> {
  isValid: boolean
  value?: {
    [FormFieldName in keyof FormValue]: FormStatusValue
  }
}
