import * as React from 'react'
import { useStore } from 'effector-react'

import type { DetailFieldDescription } from 'admin/fields/FieldDescription'
import { setInitialValue } from '../../controllers'
import { containerStore } from '../../store'

import { mountComponents } from '../../../common/utils/mountComponents'
import type { BaseNotifier } from '../../../common/notifier'
import type { BaseProvider } from '../../../admin/providers/index'
import type { BaseAnalytic } from '../../../integration/analytics/base'

type WizardStepComponentsProps = {
  elements: DetailFieldDescription[]
  resourceName: string
  provider: BaseProvider
  object: object
  setObject: Function
  notifier: BaseNotifier
  analytics: BaseAnalytic | undefined
  user: object
  ViewType: string
  submitChange: Function
}

const WizardStepComponents = (props: WizardStepComponentsProps): JSX.Element => {
  const state = useStore(containerStore)

  const {
    elements,
    resourceName,
    provider,
    object,
    setObject,
    notifier,
    analytics,
    user,
    ViewType,
    submitChange,
  } = props

  React.useEffect(() => {}, [state])

  return (
    <>
      {mountComponents({
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
      })}
    </>
  )
}

export { WizardStepComponents }
