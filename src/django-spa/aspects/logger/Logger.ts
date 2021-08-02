import { useContext } from 'react'

import { LoggingHandler } from './types'
import { ConsoleLogger } from './adapters'
import { loggerConfigContext } from './LoggerConfig.context'

export const useConsoleLogger = (): LoggingHandler => {
  // TODO: Change to proper config when it's ready
  const config = useContext(loggerConfigContext)

  return new ConsoleLogger(config)
}
