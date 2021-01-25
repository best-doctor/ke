import type { Store } from 'effector'
import type { BaseProvider } from 'admin/providers/index'
import type { BaseNotifier } from 'common/notifier'
import type { BaseAnalytic } from 'integration/analytics'
import type { GoogleConfig } from './integration/google';

type GenericAccessor = string | Function | JSX.Element | undefined

type OptionalDate = Date | null

type DetailObject = any

type WizardObject = any

type WidgetProps = {
  name: string
  mainDetailObject: DetailObject
  resource: string
  provider: BaseProvider
  helpText?: string
  displayValue?: GenericAccessor
  targetPayload: Function
  dataSource: GenericAccessor
  dataTarget: GenericAccessor
  setMainDetailObject: Function
  notifier: BaseNotifier
  analytics?: BaseAnalytic | undefined
  googleConfig?: GoogleConfig
  viewType: string
  widgetAnalytics?: Function | boolean | undefined
  style: object
  setInitialValue: Function
  submitChange: Function
  notBlockingValidators?: Function[]
  blockingValidators?: Function[]
  containerStore: Store<object>
  useClipboard?: boolean
  copyValue?: GenericAccessor
}

type FieldsTypeInAdminClass = 'detail_fields' | 'wizards' | 'additional_detail_widgets'

export { GenericAccessor, OptionalDate, DetailObject, WidgetProps, FieldsTypeInAdminClass, WizardObject }
