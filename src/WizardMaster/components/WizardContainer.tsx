/* eslint no-underscore-dangle: ["error", { "allow": ["__initial__"] }] */

import * as React from 'react'

import { containerStore } from '../store'
import { WizardStepContainer } from './WizardStepContainer'

import type { BaseNotifier } from '../../common/notifier'
import type { BaseProvider } from '../../admin/providers/index'
import type { BaseWizard } from '../interfaces'
import type { BaseAnalytic } from '../../integration/analytics/base'

type WizardContainerProps = {
  wizard: BaseWizard
  provider: BaseProvider
  object: object
  setObject: Function
  notifier: BaseNotifier
  analytics: BaseAnalytic
  ViewType: string
  user: object
  show: boolean
  submitChange: Function
}

const WizardContainer = (props: WizardContainerProps): JSX.Element => {
  const { wizard, provider, object, setObject, notifier, analytics, user, ViewType, show, submitChange } = props

  const [currentState, setCurrentState] = React.useState<string>('begin')

  const getObject = (): object => {
    return containerStore.getState().__initial__ || object
  }

  return (
    <WizardStepContainer
      wizard={wizard}
      wizardStep={wizard.stateWidgetMapping[currentState]}
      provider={provider}
      object={getObject()}
      currentState={currentState}
      setCurrentState={setCurrentState}
      setObject={setObject}
      notifier={notifier}
      analytics={analytics}
      user={user}
      ViewType={ViewType}
      show={show}
      submitChange={submitChange}
    />
  )
}

export { WizardContainer }
