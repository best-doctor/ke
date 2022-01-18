import { createContext, useContext } from 'react'
import type { LoggingHandler } from './types'
import { ConsoleLogger } from './adapters'

export const loggerContext = createContext<LoggingHandler>(new ConsoleLogger({}))

export const LoggerProvider = loggerContext.Provider

export function useLogger(): LoggingHandler {
  return useContext(loggerContext)
}
