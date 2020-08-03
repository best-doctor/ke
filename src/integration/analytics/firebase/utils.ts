import { get } from 'lodash'

import type { FirebaseEvent } from '../index'

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

  return onChangeValue
}

const getNameFromDataPath = (name: string, resourceName: string): string => {
  return `${resourceName}_${name.replace('.', '_')}`
}

export { getFirebaseEvent, getNewValueByCommonFields, getNameFromDataPath, WidgetAnalyticsProps }
