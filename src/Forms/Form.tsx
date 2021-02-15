import * as React from 'react'
import type { FunctionComponentElement, PropsWithChildren } from 'react'

import type { FormsContextData } from './types'
import { FormsContextProvider } from './Forms.context'

export function Form<T extends FormsContextData>({
  value,
  onChange,
  children,
}: FormProps<T>): FunctionComponentElement<FormProps<T>> {
  return (
    <FormsContextProvider value={[value, onChange as (val: FormsContextData) => void]}>
      <form>{children}</form>
    </FormsContextProvider>
  )
}

type FormProps<T extends FormsContextData> = PropsWithChildren<{
  value: T
  onChange: (value: T) => void
}>
