import type { FunctionComponent } from 'react'
import type { GenericAccessor } from 'typing'
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
}

type LayoutData = {
  x: number
  y: number
  w: number
  h: number
  static: boolean
}

type WizardFieldElement = BaseWizard | ((object: any) => BaseWizard | null)
type WidgetValueValidator = Function

type DetailFieldDescription = {
  name: string
  required?: boolean
  widget: FunctionComponent<any> | Function
  helpText?: string
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
