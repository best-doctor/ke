/* eslint max-classes-per-file: 0 */

import { ReactNode } from 'react'

abstract class BaseNotifier {
  notifierHanlder: Function | object

  constructor(notifierHandler: Function) {
    this.notifierHanlder = notifierHandler
  }

  abstract notifySuccess(title?: ReactNode | string, description?: ReactNode | string): void

  abstract notifyError(title?: ReactNode | string, description?: ReactNode | string): void
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

  notify(title: ReactNode | string, status: string, description?: ReactNode | string): void {
    ;(this.notifierHanlder as Function)({
      title,
      description,
      status,
      ...this.defaultNotifierConfig,
    })
  }

  notifySuccess(title: ReactNode | string = 'Обновлено', description?: ReactNode | string): void {
    this.notify(title, 'success', description)
  }

  notifyError(title: ReactNode | string = 'Ошибка', description?: ReactNode | string): void {
    this.notify(title, 'error', description)
  }
}

export { ChakraUINotifier, BaseNotifier }
