import { get } from 'lodash'

import type { GenericAccessor } from '../../typing'

const getData = (handler: GenericAccessor, data: any): any => {
  if (typeof handler === 'function') {
    return handler(data)
  }

  if (typeof handler === 'string') {
    return handler
  }

  return null
}

const getWidgetContent = (
  name: string,
  detailObject: object,
  handler: GenericAccessor,
  expectedType = 'string'
): any => {
  const widgetContent = getData(handler, detailObject)

  if (!widgetContent || typeof widgetContent !== expectedType) {
    return get(detailObject, name)
  }

  return widgetContent
}

const getPayload = (
  value: string,
  name: string,
  targetPayload: GenericAccessor
): string | { [key: string]: string } | null => {
  if (targetPayload) {
    return getData(targetPayload, value)
  }

  return { [name]: value }
}

export { getData, getWidgetContent, getPayload }
