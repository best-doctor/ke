import * as React from 'react'
import type { FunctionComponentElement, PropsWithChildren } from 'react'
import { useCallback } from 'react'

import { usePropState } from '@hooks'

import type { FormsContextData } from './types'
import { FormsContextProvider } from './Forms.context'

export function Form<T extends FormsContextData>({
  value,
  onChange,
  children,
}: FormProps<T>): FunctionComponentElement<FormProps<T>> {
  const [formData, setFormData] = usePropState(value)

  const handleChange = useCallback(
    (val: T) => {
      setFormData(val)
      onChange(val)
    },
    [onChange, setFormData]
  )

  return (
    <FormsContextProvider value={[formData, handleChange as (val: FormsContextData) => void]}>
      <form>{children}</form>
    </FormsContextProvider>
  )
}

type FormProps<T extends FormsContextData> = PropsWithChildren<{
  value: T
  onChange: (value: T) => void
}>
