import type { FunctionComponent } from 'react'
import type { GenericAccessor } from '../../typing'

type ListFieldDescription = {
  Header: string
  accessor?: any
  Cell?: Function
}

type ListFilterDescription = {
  name: string
  label: string
  Filter: FunctionComponent<any>
}

type ListFilterTemplateDescription = {
  name: string
  label: string
  filters: Function
}

type LayoutData = {
  x: number
  y: number
  w: number
  h: number
  static: boolean
}

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

export { DetailFieldDescription, ListFieldDescription, ListFilterDescription, ListFilterTemplateDescription }
