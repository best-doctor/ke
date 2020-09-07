import type { DetailFieldDescription } from 'admin/fields/FieldDescription'

import type { BaseProvider } from 'index'
import type { BaseNotifier } from 'common/notifier'
import type { BaseAnalytic } from 'integration/analytics'

import { containerStore } from './store'
import { initDetailViewControllers } from './controllers'
import { mountComponents } from '../common/utils/mountComponents'

type MountDetailFieldsArgs = {
  resourceName: string
  object: object
  elements: DetailFieldDescription[]
  provider: BaseProvider
  setObject: Function
  notifier: BaseNotifier
  user: object
  analytics: BaseAnalytic | undefined
  ViewType: string
}

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
  const [setInitialValue, submitChange] = initDetailViewControllers(provider, setObject, notifier)

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
    containerStore,
  })
}

export { mountDetailFields }
