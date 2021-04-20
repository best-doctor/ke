import type { DetailObject } from 'typing'

import type { FirebaseEvent } from '../index'
import { WidgetTypeEnum } from './enums'
import { get } from '../../../common/utils/get'

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

type CommonFilterAnalyticsPayload = {
  widgetName: string
  widgetType: string
  value: AnalyticsValue
  resource: string
  resourceId: string | undefined
  viewType: string
}

const getFirebaseEvent = (widgetAnalyticsProps: WidgetAnalyticsProps): FirebaseEvent => {
  const { eventName, widgetName, widgetType, newValue, resourceName, viewType, resourceId, url } = widgetAnalyticsProps
  return { eventName, eventPayload: { widgetName, widgetType, newValue, viewType, resourceName, resourceId, url } }
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

const getNameFromDataPath = (name: string | undefined, resourceName: string): string => {
  if (name) {
    return `${resourceName}_${name.replace('.', '_')}`
  }
  return ''
}

const getAnalyticsFilterName = (resourceName: string, filterName: string): string =>
  `${resourceName}_${filterName}_filter`

const getCommonFilterAnalyticsPayload = (
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

export {
  getFirebaseEvent,
  getNewValueByCommonFields,
  getNameFromDataPath,
  WidgetAnalyticsProps,
  getAnalyticsFilterName,
  getCommonFilterAnalyticsPayload,
}
