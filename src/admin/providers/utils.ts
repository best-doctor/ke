import type { BaseNotifier } from 'common/notifier'
import type { BaseProvider } from './index'

const makeUpdateWithNotification = (
  provider: BaseProvider,
  url: string,
  payload: object,
  setObject: Function,
  notifier: BaseNotifier
): Promise<any> => {
  return provider.patch(url, payload).then(
    (updatedObject: object) => {
      setObject(updatedObject)
      notifier.notifySuccess()
    },
    () => notifier.notifyError()
  )
}

export { makeUpdateWithNotification }
