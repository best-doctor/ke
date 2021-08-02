import { createContext } from 'react'

import type { LoggerConfig } from './types'
import { LogLevel } from './Enums'

// TODO: Remove when proper config is ready
export const loggerConfigContext = createContext<LoggerConfig>({ logLevel: LogLevel.INFO })

export const LoggerConfigProvider = loggerConfigContext.Provider
