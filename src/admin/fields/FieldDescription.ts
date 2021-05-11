import type { FunctionComponent } from 'react'
import type { Accessor, GenericAccessor } from 'typing'
import type { BaseWizard } from '../../WizardMaster/interfaces'

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
  style?: {
    variant?: 'outline' | 'ghost' | 'unstyled' | 'link' | 'solid'
    variantColor?: string
  }
}

type LayoutData = {
  x: number
  y: number
  w: number
  xs?: number
  sm?: number
  md?: number
  lg?: number
  xl?: number
  xsOffset?: number
  smOffset?: number
  mdOffset?: number
  lgOffset?: number
  xlOffset?: number
}

type WizardFieldElement = BaseWizard | ((object: any) => BaseWizard | null)
type WidgetValueValidator = Function

type DetailFieldDescription = {
  name: string
  required?: Accessor<boolean>
  widget: FunctionComponent<any> | Function
  helpText?: string
  description?: string | JSX.Element
  displayValue?: GenericAccessor
  dataSource?: GenericAccessor
  dataTarget?: GenericAccessor
  targetPayload?: GenericAccessor
  widgetAnalytics?: GenericAccessor
  notBlockingValidators?: WidgetValueValidator[] | undefined
  blockingValidators?: WidgetValueValidator[] | undefined
  href?: GenericAccessor
  layout: LayoutData
}

type WizardFieldDescription = WizardFieldElement[]

export {
  DetailFieldDescription,
  ListFieldDescription,
  ListFilterDescription,
  ListFilterTemplateDescription,
  WizardFieldDescription,
  WizardFieldElement,
}
