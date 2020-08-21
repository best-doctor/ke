import type { BaseNotifier } from 'common/notifier'
import type { BaseProvider } from './index'

const makeUpdateWithNotification = (
  provider: BaseProvider,
  url: string,
  payload: any,
  setObject: Function,
  notifier: BaseNotifier
): Promise<any> => {
  return provider.httpClient.patch(url, payload).then(
    (updatedObject: any) => {
      // TODO implement patch in base provider
      setObject(updatedObject.data.data)
      notifier.notifySuccess()
    },
    () => notifier.notifyError()
  )
}

export { makeUpdateWithNotification }
