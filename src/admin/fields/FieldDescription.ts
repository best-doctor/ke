import type { ReactNode } from 'react'
import type { LayoutData } from 'typing'

type ListFieldDescription = {
  Header: string
  accessor?: any
  Cell?: Function
}

type DetailFieldDescription = {
  name: string
  widget: ReactNode
  widget_attrs: any
  layout: LayoutData
}

export { DetailFieldDescription, ListFieldDescription }
