import type { Store } from 'effector'
import type { BaseProvider } from 'admin/providers/index'
import type { BaseNotifier } from 'common/notifier'
import type { BaseAnalytic } from 'integration/analytics'

type GenericAccessor = string | Function | JSX.Element | undefined

type OptionalDate = Date | null

type DetailObject = any

type WizardObject = any

type WidgetProps = {
  name: string
  detailObject: DetailObject
  resource: string
  provider: BaseProvider
  helpText?: string
  displayValue?: GenericAccessor
  targetPayload: Function
  dataSource: GenericAccessor
  dataTarget: GenericAccessor
  setObject: Function
  notifier: BaseNotifier
  analytics?: BaseAnalytic | undefined
  viewType: string
  widgetAnalytics?: Function | boolean | undefined
  style: object
  setInitialValue: Function
  submitChange: Function
  notBlockingValidators?: Function[]
  blockingValidators?: Function[]
  containerStore: Store<object>
}

type FieldsTypeInAdminClass = 'detail_fields' | 'wizards' | 'additional_detail_widgets'

export { GenericAccessor, OptionalDate, DetailObject, WidgetProps, FieldsTypeInAdminClass, WizardObject }
