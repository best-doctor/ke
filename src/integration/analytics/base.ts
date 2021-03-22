abstract class BaseAnalytic {
  analyticHandler: {
    logEvent: Function
  }

  constructor(config: any) {
    this.analyticHandler = this.initialize(config)
  }

  abstract initialize(config: any): any

  abstract pushEvent(...payload: any[]): void
}

export { BaseAnalytic }
