import React from 'react'

import type { DetailFieldDescription } from 'admin/fields/FieldDescription'
import { setInitialValue } from '../../controllers'
import { containerErrorsStore, containerStore } from '../../store'

import { mountComponents } from '../../../common/utils/mountComponents'
import type { BaseNotifier } from '../../../common/notifier'
import type { Provider } from '../../../admin/providers/interfaces'
import type { BaseAnalytic } from '../../../integration/analytics/base'
import type { WizardObject } from '../../../typing'

type WizardStepComponentsProps = {
  elements: DetailFieldDescription[]
  resourceName: string
  provider: Provider
  mainWizardObject: WizardObject
  setMainDetailObject: Function
  refreshMainDetailObject: Function
  notifier: BaseNotifier
  analytics?: BaseAnalytic
  user: object
  ViewType: string
  submitChange: Function
  setCurrentState: Function
}

const WizardStepComponents = (props: WizardStepComponentsProps): JSX.Element => {
  const {
    elements,
    resourceName,
    provider,
    mainWizardObject,
    setMainDetailObject,
    refreshMainDetailObject,
    notifier,
    analytics,
    user,
    ViewType,
    submitChange,
    setCurrentState,
  } = props

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
        ViewType,
        containerStore,
        containerErrorsStore,
        setCurrentState,
      })}
    </>
  )
}

export { WizardStepComponents }
