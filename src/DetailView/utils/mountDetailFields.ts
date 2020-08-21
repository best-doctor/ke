import { createStore, createEvent } from 'effector'

import { mountComponents } from '../../common/utils/mountComponents'
import { makeUpdateWithNotification } from '../../admin/providers/utils'

type WidgetPayload = { url: string; payload: object }

const containerStore = createStore<object>({})
const submitChange = createEvent<WidgetPayload>()
const setInitialValue = createEvent<object>()

const mountDetailFields = ({
  resourceName,
  object,
  elements,
  provider,
  setObject,
  notifier,
  user,
  analytics,
  ViewType,
}: any) => {
  containerStore
    .on(setInitialValue, (state: object, value: object) => ({ ...state, ...value }))
    .on(submitChange, (_, widgetPayload: WidgetPayload) => {
      const { url, payload } = widgetPayload

      makeUpdateWithNotification(provider, url, payload, setObject, notifier)
    })

  return mountComponents({
    setInitialValue,
    submitChange,
    resourceName,
    object,
    elements,
    provider,
    setObject,
    notifier,
    user,
    analytics,
    ViewType,
  })
}

export { mountDetailFields }
