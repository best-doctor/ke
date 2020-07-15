import type { FunctionComponent } from 'react'

type ListFieldDescription = {
  Header: string
  accessor?: any
  Cell?: Function
}

type LayoutData = {
  x: number
  y: number
  w: number
  h: number
  static: boolean
}

type GenericAccessor = string | Function | undefined

type DetailFieldDescription = {
  name: string
  widget: FunctionComponent<any>
  helpText?: string
  displayValue?: GenericAccessor
  dataSource?: GenericAccessor
  dataTarget?: GenericAccessor
  targetPayload?: GenericAccessor
  href?: GenericAccessor
  layout: LayoutData
}

export { DetailFieldDescription, ListFieldDescription }
