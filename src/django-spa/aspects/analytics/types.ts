export type EventName = string

export type EventPayload = {
  [key: string]: string | number | undefined
}

export type AnalyticsPayload = {
  eventName: EventName
  eventPayload: EventPayload
}

export type AnalyticsHandler = {
  pushEvent: (payload: AnalyticsPayload) => void
}

export type AnalyticsConfig = {
  [key: string]: string | undefined
}
