import { LoggerConfig, LoggingHandler, LogHandler } from '../types'
import { LogLevel } from '../Enums'

abstract class BaseLogger<Config extends LoggerConfig, Handler extends LogHandler> implements LoggingHandler {
  logger: Handler

  logLevel: LogLevel = LogLevel.INFO

  constructor(config: Config) {
    this.logger = this.initialize(config)
  }

  abstract initialize(config: Config): Handler

  log(level: LogLevel, message: any): void {
    if (level >= this.logLevel) {
      this.logger.log(level, message)
    }
  }

  trace(message: any): void {
    this.log(LogLevel.TRACE, message)
  }

  debug(message: any): void {
    this.log(LogLevel.DEBUG, message)
  }

  info(message: any): void {
    this.log(LogLevel.INFO, message)
  }

  warning(message: any): void {
    this.log(LogLevel.WARNING, message)
  }

  error(message: any): void {
    this.log(LogLevel.ERROR, message)
  }
}

export { BaseLogger }
