/* eslint max-classes-per-file: 0 */

abstract class BaseNotifier {
  notifierHanlder: Function | object

  constructor(notifierHandler: Function) {
    this.notifierHanlder = notifierHandler
  }

  abstract notifySuccess(): void

  abstract notifyError(): void
}

type ChakraUINotifierConfig = {
  position: string
  duration: number
  isClosable: boolean
}

class ChakraUINotifier extends BaseNotifier {
  defaultNotifierConfig: ChakraUINotifierConfig = {
    position: 'top',
    duration: 9000,
    isClosable: true,
  }

  notify(message: string, status: string): void {
    (this.notifierHanlder as Function)({
      title: message,
      status,
      ...this.defaultNotifierConfig,
    })
  }

  notifySuccess(message: string | undefined = 'Обновлено'): void {
    this.notify(message, 'success')
  }

  notifyError(message: string | undefined = 'Ошибка'): void {
    this.notify(message, 'error')
  }
}

export { ChakraUINotifier, BaseNotifier }
