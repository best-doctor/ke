import type { FunctionComponent } from 'react'
import type { LayoutData } from 'typing'

type ListFieldDescription = {
  Header: string
  accessor?: any
  Cell?: Function
}

type DetailFieldDescription = {
  name: string
  widget: FunctionComponent<any>
  widget_attrs?: any
  layout: LayoutData
}

export { DetailFieldDescription, ListFieldDescription }
