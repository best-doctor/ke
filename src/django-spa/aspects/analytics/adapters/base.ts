import { AnalyticsConfig, AnalyticsHandler, AnalyticsPayload, EventName, EventPayload } from '../types'

interface Handler {
  logEvent: (eventName: EventName, payload: EventPayload) => void
}

abstract class BaseAnalytic<Config extends AnalyticsConfig, THandler extends Handler> implements AnalyticsHandler {
  analyticHandler: THandler

  constructor(config: Config) {
    this.analyticHandler = this.initialize(config)
  }

  abstract initialize(config: Config): THandler

  abstract pushEvent(payload: AnalyticsPayload): void
}

export { BaseAnalytic }
