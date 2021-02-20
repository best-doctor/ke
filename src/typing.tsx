import type { Store } from 'effector'
import type { Provider } from 'admin/providers/interfaces'
import type { BaseNotifier } from 'common/notifier'
import type { BaseAnalytic } from 'integration/analytics'
import type { GoogleConfig } from './integration/google'

type Accessor<T> = T | Function | undefined

type GenericAccessor = string | Function | JSX.Element | undefined

type OptionalDate = Date | null

type DetailObject = any

type WizardObject = any

type ValueOrPromise<T> = T | Promise<T>

type WidgetProps = {
  name: string
  mainDetailObject: DetailObject
  resource: string
  provider: Provider
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
  cacheTime?: Accessor<number>
}

type FieldsTypeInAdminClass = 'detail_fields' | 'wizards' | 'additional_detail_widgets'

export {
  GenericAccessor,
  Accessor,
  OptionalDate,
  DetailObject,
  WidgetProps,
  FieldsTypeInAdminClass,
  WizardObject,
  ValueOrPromise,
}
