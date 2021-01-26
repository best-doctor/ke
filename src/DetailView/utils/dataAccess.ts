import type { GenericAccessor, DetailObject } from '../../typing'
import { get } from '../../common/utils/get'

const getData = (handler: GenericAccessor, data: DetailObject, context = {}): any => {
  if (typeof handler === 'function') {
    return handler(data, context)
  }

  if (typeof handler === 'string') {
    return handler
  }

  return null
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

const getCopyHandler = (value: any, copyValue?: GenericAccessor, fallbackCopyValue?: GenericAccessor): Function => {
  const realCopyValue = copyValue || fallbackCopyValue
  if (typeof realCopyValue === 'function') return () => realCopyValue(value)

  if (typeof realCopyValue === 'string') return () => realCopyValue

  return () => value.toString()
}

export { getData, getWidgetContent, getPayload, getCopyHandler }
