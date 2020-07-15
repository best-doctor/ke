import { get } from 'lodash'

type WidgetDataHandler = string | Function | undefined

const getData = (handler: WidgetDataHandler, detailObject: any): any => {
  if (typeof handler === 'function') {
    return handler(detailObject)
  }

  if (typeof handler === 'string') {
    return handler
  }

  return null
}

const getWidgetContent = (name: string, detailObject: any, handler: WidgetDataHandler): any => {
  return getData(handler, detailObject) || get(detailObject, name)
}

export { getData, getWidgetContent }
