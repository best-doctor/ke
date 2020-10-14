import { get } from 'lodash'

import type { GenericAccessor, DetailObject } from '../../typing'

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

export { getData, getWidgetContent, getPayload }
