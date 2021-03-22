import { get } from '../../common/utils/get'
import type { GenericAccessor, DetailObject, Accessor, ValueOrPromise } from '../../typing'

const getData = (handler: GenericAccessor, data: DetailObject, context = {}): any => {
  if (typeof handler === 'function') {
    return handler(data, context)
  }

  if (typeof handler === 'string') {
    return handler
  }

  return null
}

const getAccessor = (handler: Accessor<any>, data: DetailObject, context = {}): any => {
  if (typeof handler === 'function') {
    return handler(data, context)
  }

  return handler
}

const getAccessorWithDefault = (
  handler: Accessor<any>,
  data: DetailObject,
  context = {},
  defaultValue: any = undefined
): any => {
  const value = getAccessor(handler, data, context)
  if (value === undefined) return defaultValue
  return value
}

const getWidgetContent = (name: string, detailObject: DetailObject, handler: GenericAccessor, context = {}): any => {
  const widgetContent = getData(handler, detailObject, context)

  if (!widgetContent) {
    return get(detailObject, name)
  }

  return widgetContent
}

const getPayload = (
  value: any,
  name: string,
  targetPayload: GenericAccessor
): string | { [key: string]: string } | null => {
  if (targetPayload) {
    return getData(targetPayload, value)
  }

  return { [name]: value }
}

const getCopyHandler = (
  value: { toString: Function } | null,
  copyValue?: GenericAccessor,
  fallbackCopyValue?: GenericAccessor
): Function => {
  const realCopyValue = copyValue || fallbackCopyValue
  if (typeof realCopyValue === 'function') return () => realCopyValue(value)

  if (typeof realCopyValue === 'string') return () => realCopyValue

  return () => (value ? value.toString() : value)
}

const ensurePromise = <T>(valueOrPromise: ValueOrPromise<T>): Promise<T> => Promise.resolve(valueOrPromise)

const applyCallback = <T>(valueOrPromise: ValueOrPromise<T>, callback: Function): any => {
  ensurePromise(valueOrPromise).then((value: any) => callback(value))
}

export {
  getData,
  getAccessor,
  getAccessorWithDefault,
  getWidgetContent,
  getPayload,
  getCopyHandler,
  ensurePromise,
  applyCallback,
}
