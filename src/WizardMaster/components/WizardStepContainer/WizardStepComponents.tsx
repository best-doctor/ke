import * as React from 'react'
import { useStore } from 'effector-react'

import type { DetailFieldDescription } from 'admin/fields/FieldDescription'
import { setInitialValue } from '../../controllers'
import { containerStore } from '../../store'

import { mountComponents } from '../../../common/utils/mountComponents'
import type { BaseNotifier } from '../../../common/notifier'
import type { BaseProvider } from '../../../admin/providers/index'
import type { BaseAnalytic } from '../../../integration/analytics/base'
import type { WizardObject } from '../../../typing'
import type { GoogleConfig } from '../../../integration/google'

type WizardStepComponentsProps = {
  elements: DetailFieldDescription[]
  resourceName: string
  provider: BaseProvider
  mainWizardObject: WizardObject
  setMainDetailObject: Function
  refreshMainDetailObject: Function
  notifier: BaseNotifier
  analytics: BaseAnalytic | undefined
  googleConfig: GoogleConfig | undefined
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
    mainWizardObject,
    setMainDetailObject,
    refreshMainDetailObject,
    notifier,
    analytics,
    googleConfig,
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
        mainDetailObject: mainWizardObject,
        elements,
        provider,
        setMainDetailObject,
        refreshMainDetailObject,
        notifier,
        user,
        analytics,
        googleConfig,
        ViewType,
        containerStore,
      })}
    </>
  )
}

export { WizardStepComponents }
