import { BaseAnalytic } from './base'
import type { DetailObject } from '../../typing'
import { get } from '../../common/utils/get'
import { CommonEvent, CommonFilterAnalyticsPayload } from './types'
import { WidgetTypeEnum } from './enums'

type WidgetAnalyticsParams = {
  eventName: string
  widgetType: string
  widgetName?: string | undefined
  analytics?: BaseAnalytic | undefined
  widgetAnalytics?: Function | boolean | undefined
  viewType: string
  objectForAnalytics?: DetailObject
  resource: string
  name?: string
  value?: any
}

type AnalyticsValue = string | object

type WidgetAnalyticsProps = {
  objectForAnalytics: DetailObject | undefined
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

const getCommonEvent = (widgetAnalyticsProps: WidgetAnalyticsProps): CommonEvent => {
  const { eventName, widgetName, widgetType, newValue, resourceName, viewType, resourceId, url } = widgetAnalyticsProps
  return { eventName, eventPayload: { widgetName, widgetType, newValue, viewType, resourceName, resourceId, url } }
}

const getNameFromDataPath = (name: string | undefined, resourceName: string): string => {
  if (name) {
    return `${resourceName}_${name.replace('.', '_')}`
  }
  return ''
}

const getNewValueByCommonFields = (onChangeValue: AnalyticsValue): string => {
  const commonFieldsList = ['target.value', 'uuid', 'id', 'email']

  // eslint-disable-next-line
  for (const field of commonFieldsList) {
    const newValue = get(onChangeValue as object, field)

    if (newValue !== undefined) return newValue as string
  }

  return JSON.stringify(onChangeValue)
}

export const pushAnalytics = (params: WidgetAnalyticsParams): void => {
  const {
    eventName,
    widgetName,
    widgetType,
    analytics,
    widgetAnalytics,
    value: onChangeValue,
    objectForAnalytics,
    resource: resourceName,
    name: adminWidgetName,
    viewType,
  } = params

  if (typeof widgetAnalytics === 'boolean' && widgetAnalytics === false) {
    return
  }

  const widgetDefaultAnalyticsPayload = {
    onChangeValue,
    objectForAnalytics,
    eventName,
    viewType,
    widgetName: widgetName || getNameFromDataPath(adminWidgetName, resourceName),
    resourceName,
    resourceId:
      (objectForAnalytics &&
        (objectForAnalytics.uuid || (objectForAnalytics.id && objectForAnalytics.id.toString()))) ||
      '',
    widgetType,
    url: window.location.href,
    newValue: getNewValueByCommonFields(onChangeValue),
  }

  let event = null

  if (widgetAnalytics && typeof widgetAnalytics === 'function') {
    // check if user has defined a custom analytics payload
    event = widgetAnalytics(widgetDefaultAnalyticsPayload)
  } else {
    event = getCommonEvent(widgetDefaultAnalyticsPayload)
  }

  if (analytics && typeof analytics.pushEvent === 'function') {
    analytics.pushEvent(event)
  }
}

const getAnalyticsFilterName = (resourceName: string, filterName: string): string =>
  `${resourceName}_${filterName}_filter`

export const getCommonFilterAnalyticsPayload = (
  resourceName: string,
  filterValue: AnalyticsValue,
  name: string
): CommonFilterAnalyticsPayload => ({
  widgetName: getAnalyticsFilterName(resourceName, name),
  widgetType: WidgetTypeEnum.FILTER,
  value: filterValue,
  resource: resourceName,
  resourceId: undefined,
  viewType: 'list_view',
})
