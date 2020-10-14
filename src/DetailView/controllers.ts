import type { BaseNotifier } from 'common/notifier'
import type { BaseProvider } from 'index'

import { containerStore } from './store'
import { setInitialValue, submitChange } from './events'
import { makeUpdateWithNotification } from '../admin/providers/utils'

import type { WidgetPayload } from './events'

const initDataUpdateHandler = (provider: BaseProvider, setMainDetailObject: Function, notifier: BaseNotifier): void => {
  /*
    submitChange function used to handle user action on the widget.

    There are two types of submitChange function – for Detail View and for Wizard View.

    In case of DetailView, submitChange takes payload of widget and and url for sending data to the backend.
    And the function sends a payload to the backend at the specified url
  */
  containerStore.on(submitChange, (_, widgetPayload: WidgetPayload) => {
    const { url, payload } = widgetPayload

    makeUpdateWithNotification(provider, url, payload, setMainDetailObject, notifier)
  })
}

const initDetailViewControllers = (provider: BaseProvider, setMainDetailObject: Function, notifier: BaseNotifier): Function[] => {
  /*
    setInitialValue function used to store widget initial data.

    There are two types of setInitialValue function – for Detail View and for Wizard View.

    In case of DetailView, setInitialValue does nothing and
    is only needed to comply with the interface (for compatibility with the Wizard View)
  */
  containerStore.on(setInitialValue, (state: object, value: object) => ({ ...state, ...value }))

  initDataUpdateHandler(provider, setMainDetailObject, notifier)

  return [setInitialValue, submitChange]
}

export { initDetailViewControllers, initDataUpdateHandler }
