import { LogLevel } from '../Enums'
import { ConsoleLogger } from './console'

let mockedConsoleLog: jest.SpyInstance
let mockedConsoleError: jest.SpyInstance

beforeEach(() => {
  mockedConsoleLog = jest.spyOn(console, 'log').mockImplementation()
  mockedConsoleError = jest.spyOn(console, 'error').mockImplementation()
})

afterEach(() => {
  mockedConsoleLog.mockRestore()
  mockedConsoleError.mockRestore()
})

const getLogger = (logLevel = LogLevel.TRACE): ConsoleLogger => new ConsoleLogger({ logLevel })

test.each([[LogLevel.TRACE], [LogLevel.DEBUG], [LogLevel.INFO]])(
  'Should call console log for levels below WARNING - %s',
  (level) => {
    const logger = getLogger()

    logger.log(level, 'test')

    expect(mockedConsoleLog).toHaveBeenCalledTimes(1)
    expect(mockedConsoleLog).toHaveBeenCalledWith('test')
    expect(mockedConsoleError).toHaveBeenCalledTimes(0)
  }
)

test.each([[LogLevel.WARNING], [LogLevel.ERROR], [LogLevel.OFF]])(
  'Should call console error for levels above WARNING - %s',
  (level) => {
    const logger = getLogger()

    logger.log(level, 'test')

    expect(mockedConsoleError).toHaveBeenCalledTimes(1)
    expect(mockedConsoleError).toHaveBeenCalledWith('test')
    expect(mockedConsoleLog).toHaveBeenCalledTimes(0)
  }
)

test.each([
  [LogLevel.TRACE, 1],
  [LogLevel.DEBUG, 1],
  [LogLevel.INFO, 1],
  [LogLevel.WARNING, 0],
  [LogLevel.ERROR, 0],
  [LogLevel.OFF, 0],
])('Should call log for levels above configured - %s', (level, callCount) => {
  const logger = getLogger(level)

  logger.log(LogLevel.INFO, 'test')

  expect(mockedConsoleLog).toHaveBeenCalledTimes(callCount)
})

test('Default log level in INFO', () => {
  const logger = new ConsoleLogger({})

  expect(logger.logLevel).toBe(LogLevel.INFO)
})
