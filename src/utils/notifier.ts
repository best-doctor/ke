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

  notifySuccess(message: string | undefined = 'Обновлено'): void {
    this.notifierHanlder({
      title: message,
      status: 'success',
      ...this.defaultNotifierConfig,
    })
  }

  notifyError(message: string | undefined = 'Ошибка'): void {
    this.notifierHanlder({
      title: message,
      status: 'error',
      ...this.defaultNotifierConfig,
    })
  }
}

export { ChakraUINotifier, BaseNotifier }
