import type { Store } from 'effector'
import type { Provider } from 'admin/providers/interfaces'
import type { BaseNotifier } from 'common/notifier'
import type { BaseAnalytic } from 'integration/analytics'

type Accessor<T> = T | Function | undefined

type GenericAccessor = string | Function | JSX.Element | undefined

type OptionalDate = Date | null

type DetailObject = {
  id?: string | number
  uuid?: string
  url?: string
  [key: string]: any
}

type WizardObject = DetailObject

type ValueOrPromise<T> = T | Promise<T>

type WidgetProps = {
  name: string
  mainDetailObject: DetailObject
  resource: string
  provider: Provider
  helpText?: string | JSX.Element
  displayValue?: GenericAccessor
  targetPayload: Function
  dataSource: GenericAccessor
  dataTarget: GenericAccessor
  setMainDetailObject: Function
  notifier: BaseNotifier
  analytics?: BaseAnalytic | undefined
  viewType: string
  widgetAnalytics?: Function | boolean | undefined
  style: object
  setInitialValue: Function
  submitChange: Function
  notBlockingValidators?: ValidatorFunction[]
  blockingValidators?: ValidatorFunction[]
  containerStore: Store<object>
  useClipboard?: boolean
  copyValue?: GenericAccessor
  cacheTime?: Accessor<number>
}

type FieldsTypeInAdminClass = 'detail_fields' | 'wizards' | 'additional_detail_widgets'

type ValidatorFunction = (
  changeValue: object | string,
  provider: Provider,
  detailObject: DetailObject
) => Promise<string>

export {
  GenericAccessor,
  Accessor,
  OptionalDate,
  DetailObject,
  WidgetProps,
  FieldsTypeInAdminClass,
  WizardObject,
  ValueOrPromise,
  ValidatorFunction,
}
