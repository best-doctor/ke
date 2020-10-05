import { getFirebaseEvent, getNameFromDataPath, getNewValueByCommonFields } from './firebase/utils'
import type { DetailObject } from '../../typing'

import type { BaseAnalytic } from './index'

type widgetAnalyticsParams = {
  eventName: string
  widgetType: string
  widgetName?: string | undefined
  analytics: BaseAnalytic | undefined
  widgetAnalytics?: Function | boolean | undefined
  viewType: string
  detailObject?: DetailObject
  resource: string
  name?: string
  value?: any
}

const pushAnalytics = (params: widgetAnalyticsParams): void => {
  const {
    eventName,
    widgetName,
    widgetType,
    analytics,
    widgetAnalytics,
    value: onChangeValue,
    detailObject: object,
    resource: resourceName,
    name: adminWidgetName,
    viewType,
  } = params

  if (typeof widgetAnalytics === 'boolean' && widgetAnalytics === false) {
    return
  }

  const widgetDefaultAnalyticsPayload = {
    onChangeValue,
    object,
    eventName,
    viewType,
    widgetName: widgetName || getNameFromDataPath(adminWidgetName, resourceName),
    resourceName,
    resourceId: object && (object.uuid || object.id),
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
