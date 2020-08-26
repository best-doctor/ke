import type { BaseNotifier } from 'common/notifier'
import type { BaseProvider } from 'index'

import { containerStore } from './store'
import { setInitialValue, submitChange } from './events'
import { makeUpdateWithNotification } from '../admin/providers/utils'

import type { WidgetPayload } from './events'

const initDataUpdateHandler = (provider: BaseProvider, setObject: Function, notifier: BaseNotifier): void => {
  containerStore.on(submitChange, (_, widgetPayload: WidgetPayload) => {
    const { url, payload } = widgetPayload

    makeUpdateWithNotification(provider, url, payload, setObject, notifier)
  })
}

const initDetailViewControllers = (provider: BaseProvider, setObject: Function, notifier: BaseNotifier): Function[] => {
  containerStore.on(setInitialValue, (state: object, value: object) => ({ ...state, ...value }))

  initDataUpdateHandler(provider, setObject, notifier)

  return [setInitialValue, submitChange]
}

export { initDetailViewControllers }
