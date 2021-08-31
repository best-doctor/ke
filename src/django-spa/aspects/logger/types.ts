import { LogLevel } from './Enums'

export interface LoggingHandler {
  log: (level: LogLevel, message: unknown) => void
  trace: (message: unknown) => void
  debug: (message: unknown) => void
  info: (message: unknown) => void
  warning: (message: unknown) => void
  error: (message: unknown) => void
}

export type LoggerConfig = {
  logLevel?: LogLevel
  [key: string]: string | number | undefined
}

export interface LogHandler {
  log(level: LogLevel, message: unknown): void
}
