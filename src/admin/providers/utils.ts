import type { BaseNotifier } from 'common/notifier'
import type { Provider } from 'admin/providers/interfaces'
import type { PaginationParameters } from './pagination'

const makeUpdateWithNotification = (
  provider: Provider,
  url: string,
  payload: object,
  setObject: Function,
  notifier: BaseNotifier
): Promise<any> =>
  provider.patch(url, payload).then(
    (updatedObject: object) => {
      setObject(updatedObject)
      notifier.notifySuccess()
    },
    () => notifier.notifyError()
  )

const setPaginationParameters = (url: URL, paginationParameters: PaginationParameters): void => {
  Object.entries(paginationParameters).forEach(([parameter, value]): void => {
    if (value === undefined) {
      return
    }
    if (value === null) {
      url.searchParams.set(parameter, '')
    } else {
      url.searchParams.set(parameter, value.toString())
    }
  })
}

export { makeUpdateWithNotification, setPaginationParameters }
