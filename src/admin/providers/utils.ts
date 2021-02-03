import type { BaseNotifier } from 'common/notifier'
import type { Provider } from 'admin/providers/interfaces'

const makeUpdateWithNotification = (
  provider: Provider,
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
