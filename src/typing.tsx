import type { Store } from 'effector'
import type { Provider } from 'admin/providers/interfaces'
import type { BaseNotifier } from 'common/notifier'
import type { BaseAnalytic } from 'integration/analytics'
import { CSSProperties, MutableRefObject } from 'react'
import { BoxProps } from '@chakra-ui/react'
import { TestIdGenerationProps } from './django-spa/aspects/test-id/TestIdProvider'
import { ErrorElement } from './WizardMaster/store'

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

interface WizardControl {
  reload: () => void
}

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
  style?: CSSProperties
  setInitialValue: Function
  submitChange: Function
  notBlockingValidators?: ValidatorFunction[]
  blockingValidators?: ValidatorFunction[]
  containerStore: Store<object>
  containerErrorsStore?: Store<ErrorElement[]> | undefined
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
  widgetClassName?: string
  className?: string
  allowAllDefinedValues?: Accessor<boolean>
  activeWizardRef?: MutableRefObject<WizardControl | null>
} & Omit<TestIdGenerationProps, 'name'>

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
  WizardControl,
  FieldsTypeInAdminClass,
  WizardObject,
  ValueOrPromise,
  ValidatorFunction,
}
