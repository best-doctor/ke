abstract class BaseNotifier {
  notifierHanlder: any

  constructor(notifierHandler: any) {
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

  _notify(message: string, status: string): void {
    this.notifierHanlder({
      title: message,
      status: status,
      ...this.defaultNotifierConfig,
    })
  }

  notifySuccess(message: string | undefined = 'Обновлено'): void {
    this._notify(message, 'success')
  }

  notifyError(message: string | undefined = 'Ошибка'): void {
    this._notify(message, 'error')
  }
}

export { ChakraUINotifier, BaseNotifier }
