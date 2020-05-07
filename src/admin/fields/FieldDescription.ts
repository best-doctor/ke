import type { ReactNode } from 'react'
import type { LayoutData } from 'typing'

type ListFieldColumType = {
  Header: string
  accessor?: string
  Cell?: Function
}

type DetailFieldDescription = {
  name: string
  widget: ReactNode
  widget_attrs: any
  layout: LayoutData
}

type ListFieldDescription = {
  Header: string
  columns: Array<ListFieldColumType>
}

export { DetailFieldDescription, ListFieldDescription }
