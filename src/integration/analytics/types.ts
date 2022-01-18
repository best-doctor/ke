export type AnalyticsValue = string | object

export type CommonEventPayload = {
  resourceName: string
  resourceId: string
  widgetName: string
  widgetType: string
  url: string
  newValue?: string
  viewType: string
}

export type CommonEvent = {
  eventName: string
  eventPayload: CommonEventPayload
}

export type CommonFilterAnalyticsPayload = {
  widgetName: string
  widgetType: string
  value: AnalyticsValue
  resource: string
  resourceId: string | undefined
  viewType: string
}
