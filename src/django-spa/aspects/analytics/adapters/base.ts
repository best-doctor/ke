import { AnalyticsConfig, AnalyticsPayload, EventName, EventPayload } from '../types'

interface AnalyticHandler {
  logEvent: (eventName: EventName, payload: EventPayload) => void
}

abstract class BaseAnalytic<Config extends AnalyticsConfig, Handler extends AnalyticHandler> {
  analyticHandler: Handler

  constructor(config: Config) {
    this.analyticHandler = this.initialize(config)
  }

  abstract initialize(config: Config): Handler

  abstract pushEvent(payload: AnalyticsPayload): void
}

export { BaseAnalytic }
