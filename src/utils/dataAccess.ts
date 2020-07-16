import { get } from 'lodash'

import type { GenericAccessor } from '../typing'

const getData = (handler: GenericAccessor, detailObject: any): any => {
  if (typeof handler === 'function') {
    return handler(detailObject)
  }

  if (typeof handler === 'string') {
    return handler
  }

  return null
}

const getWidgetContent = (name: string, detailObject: any, handler: GenericAccessor): any => {
  return getData(handler, detailObject) || get(detailObject, name)
}

const getPayload = (
  e: any,
  name: string,
  targetPayload: GenericAccessor
): string | { [key: string]: string } | null => {
  if (targetPayload) {
    return getData(targetPayload, e)
  }

  return { [name]: e.target.value }
}

export { getData, getWidgetContent, getPayload }
