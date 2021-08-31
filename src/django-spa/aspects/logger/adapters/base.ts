import { LoggerConfig, LoggingHandler, LogHandler } from '../types'
import { LogLevel } from '../Enums'

abstract class BaseLogger<Config extends LoggerConfig, Handler extends LogHandler> implements LoggingHandler {
  logger: Handler

  logLevel: LogLevel = LogLevel.INFO

  constructor(config: Config) {
    this.logger = this.initialize(config)
  }

  abstract initialize(config: Config): Handler

  log(level: LogLevel, message: unknown): void {
    if (level >= this.logLevel) {
      this.logger.log(level, message)
    }
  }

  trace(message: unknown): void {
    this.log(LogLevel.TRACE, message)
  }

  debug(message: unknown): void {
    this.log(LogLevel.DEBUG, message)
  }

  info(message: unknown): void {
    this.log(LogLevel.INFO, message)
  }

  warning(message: unknown): void {
    this.log(LogLevel.WARNING, message)
  }

  error(message: unknown): void {
    this.log(LogLevel.ERROR, message)
  }
}

export { BaseLogger }
