abstract class BaseAnalytic {
  analyticHandler: any

  constructor(config: any) {
    this.analyticHandler = this.initialize(config)
  }

  abstract initialize(config: any): any

  abstract pushEvent(...payload: any[]): void
}

export { BaseAnalytic }
