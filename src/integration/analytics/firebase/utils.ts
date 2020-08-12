import { get } from 'lodash'

import type { FirebaseEvent } from '../index'
import { WidgetTypeEnum } from './enums'

type WidgetAnalyticsProps = {
  object: any
  onChangeValue: any
  eventName: string
  widgetName: string
  widgetType: string
  viewType: string
  resourceName: string
  resourceId: string
  currentValue?: string
  url: string
  newValue?: string
}

const getFirebaseEvent = (widgetAnalyticsProps: WidgetAnalyticsProps): FirebaseEvent => {
  const { eventName, widgetName, widgetType, newValue, resourceName, viewType, resourceId, url } = widgetAnalyticsProps
  return { eventName, eventPayload: { widgetName, widgetType, newValue, viewType, resourceName, resourceId, url } }
}

const getNewValueByCommonFields = (onChangeValue: any): string => {
  const commonFieldsList = ['target.value', 'uuid', 'id', 'email']

  // eslint-disable-next-line
  for (const field of commonFieldsList) {
    const newValue = get(onChangeValue, field)

    if (newValue) return newValue
  }

  return JSON.stringify(onChangeValue)
}

const getNameFromDataPath = (name: string | undefined, resourceName: string): string => {
  if (name) {
    return `${resourceName}_${name.replace('.', '_')}`
  }
  return ''
}

const getAnalyticsFilterName = (resourceName: string, filterName: string): string => {
  return `${resourceName}_${filterName}_filter`
}

const getCommonFilterAnalyticsPayload = (resourceName: string, filterValue: any, name: string): any => {
  return {
    widgetName: getAnalyticsFilterName(resourceName, name),
    widgetType: WidgetTypeEnum.FILTER,
    value: filterValue,
    resource: resourceName,
    resourceId: undefined,
    viewType: 'list_view',
  }
}

export {
  getFirebaseEvent,
  getNewValueByCommonFields,
  getNameFromDataPath,
  WidgetAnalyticsProps,
  getAnalyticsFilterName,
  getCommonFilterAnalyticsPayload,
}
