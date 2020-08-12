import { get } from 'lodash'

import type { GenericAccessor } from '../typing'

const getData = (handler: GenericAccessor, detailObject: object): any => {
  if (typeof handler === 'function') {
    return handler(detailObject)
  }

  if (typeof handler === 'string') {
    return handler
  }

  return null
}

const getWidgetContent = (name: string, detailObject: object, handler: GenericAccessor, expectedType = 'string'): any => {
  const widgetContent = getData(handler, detailObject)

  if (!widgetContent || typeof widgetContent !== expectedType) {
    return get(detailObject, name)
  }

  return widgetContent
}

const getPayload = (
  e: React.ChangeEvent<HTMLInputElement>,
  name: string,
  targetPayload: GenericAccessor
): string | { [key: string]: string } | null => {
  if (targetPayload) {
    return getData(targetPayload, e)
  }

  return { [name]: e.target.value }
}

export { getData, getWidgetContent, getPayload }
