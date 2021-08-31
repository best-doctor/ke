import {useConfig} from "../../../data-provider";

import { LoggingHandler } from './types'
import { ConsoleLogger } from './adapters'
import {AspectKey} from "../enums";

export const useConsoleLogger = (): LoggingHandler => {
  const config = useConfig({key: AspectKey.LOGGER})

  return new ConsoleLogger(config)
}
