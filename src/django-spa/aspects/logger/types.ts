import { LogLevel } from './Enums'

export interface LoggingHandler {
  log: (level: LogLevel, message: any) => void
  trace: (message: any) => void
  debug: (message: any) => void
  info: (message: any) => void
  warning: (message: any) => void
  error: (message: any) => void
}

export type LoggerConfig = {
  logLevel?: LogLevel
  [key: string]: string | number | undefined
}

export interface LogHandler {
  log(level: LogLevel, message: any): void
}
