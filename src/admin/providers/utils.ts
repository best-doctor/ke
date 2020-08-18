import type { BaseNotifier } from 'utils/notifier'
import type { BaseProvider } from './index'

const makeUpdateWithNotification = (
  provider: BaseProvider,
  url: string,
  payload: any,
  setObject: Function,
  notifier: BaseNotifier
): Promise<any> => {
  return provider.put(url, payload).then(
    (updatedObject: any) => {
      setObject(updatedObject)
      notifier.notifySuccess()
    },
    () => notifier.notifyError()
  )
}

export { makeUpdateWithNotification }
