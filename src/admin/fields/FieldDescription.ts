import type { ReactNode } from 'react'
import type { LayoutData } from 'typing'
import type { BaseField } from './BaseField'

type FieldPosition = {
  topLeft: number[]
  lowRight: number[]
}

type ListFieldColumType = {
  Header: string
  accessor?: string
  Cell?: Function
}

type DetailFieldDescription = {
  name: string
  readOnly: boolean
  fieldType: typeof BaseField
  widget: ReactNode
  widget_attrs: any
  layout: LayoutData
  position?: FieldPosition
  className?: string
}

type ListFieldDescription = {
  Header: string
  columns: Array<ListFieldColumType>
}

export { DetailFieldDescription, ListFieldDescription }
