import { getFirebaseEvent, getNameFromDataPath, getNewValueByCommonFields } from './firebase/utils'
import type { DetailObject } from '../../typing'

import type { BaseAnalytic } from './index'

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

const pushAnalytics = (params: WidgetAnalyticsParams): void => {
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
    event = getFirebaseEvent(widgetDefaultAnalyticsPayload)
  }

  if (analytics && typeof analytics.pushEvent === 'function') {
    analytics.pushEvent(event)
  }
}

export { pushAnalytics }
