import type { Store } from 'effector'
import type { Provider } from 'admin/providers/interfaces'
import type { BaseNotifier } from 'common/notifier'
import type { BaseAnalytic } from 'integration/analytics'
import { CSSProperties } from 'react'
import { BoxProps } from '@chakra-ui/react'

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
  targetPayload: Function
  dataSource: GenericAccessor
  dataTarget: GenericAccessor
  setMainDetailObject: Function
  notifier: BaseNotifier
  viewType: string
  style: CSSProperties
  setInitialValue: Function
  submitChange: Function
  notBlockingValidators?: ValidatorFunction[]
  blockingValidators?: ValidatorFunction[]
  containerStore: Store<object>
  helpText?: string
  description?: string | JSX.Element
  displayValue?: GenericAccessor
  analytics?: BaseAnalytic | undefined
  widgetAnalytics?: Function | boolean | undefined
  useClipboard?: boolean
  copyValue?: GenericAccessor
  cacheTime?: Accessor<number>
  required?: Accessor<boolean>
  labelContainerProps?: BoxProps
  containerProps?: BoxProps
}

type FieldsTypeInAdminClass = 'detail_fields' | 'wizards' | 'additional_detail_widgets' | 'updated_wizards'

type ValidatorFunction = (
  changeValue: object | string,
  provider: Provider,
  detailObject: DetailObject,
  context?: Record<string, unknown>
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
