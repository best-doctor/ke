/* eslint max-classes-per-file: 0 */
import { BaseLogger } from './base'
import { LoggerConfig, LogHandler } from '../types'
import { LogLevel } from '../Enums'

class ConsoleHandler implements LogHandler {
  log(level: LogLevel, message: any): void {
    if (level >= LogLevel.WARNING) {
      // eslint-disable-next-line no-console
      return console.error(message)
    }
    // eslint-disable-next-line no-console
    console.log(message)
  }
}

class ConsoleLogger extends BaseLogger<LoggerConfig, ConsoleHandler> {
  initialize({ logLevel = LogLevel.INFO }: LoggerConfig): ConsoleHandler {
    this.logLevel = logLevel
    return new ConsoleHandler()
  }
}

export { ConsoleLogger }
