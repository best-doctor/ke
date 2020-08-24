import { createStore, createEvent } from 'effector'

import type { DetailFieldDescription } from 'admin/fields/FieldDescription'

import type { BaseProvider } from 'index'
import type { BaseNotifier } from 'common/notifier'
import type { BaseAnalytic } from 'integration/analytics'

import { mountComponents } from '../common/utils/mountComponents'
import { makeUpdateWithNotification } from '../admin/providers/utils'

type WidgetPayload = { url: string; payload: object }

type MountDetailFieldsArgs = {
  resourceName: string
  object: object
  elements: DetailFieldDescription[]
  provider: BaseProvider
  setObject: Function
  notifier: BaseNotifier
  user: object
  analytics: BaseAnalytic
  ViewType: string
}

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
}: MountDetailFieldsArgs): JSX.Element[] => {
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
