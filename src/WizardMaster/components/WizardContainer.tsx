/* eslint no-underscore-dangle: ["error", { "allow": ["__initial__"] }] */

import * as React from 'react'

import { containerStore } from '../store'
import { WizardStepContainer } from './WizardStepContainer'

import type { BaseNotifier } from '../../common/notifier'
import type { Provider } from '../../admin/providers/interfaces'
import type { BaseWizard } from '../interfaces'
import type { BaseAnalytic } from '../../integration/analytics/base'
import type { DetailObject } from '../../typing'
import type { GoogleConfig } from '../../integration/google'

type WizardContainerProps = {
  wizard: BaseWizard
  provider: Provider
  mainDetailObject: DetailObject
  setMainDetailObject: Function
  refreshMainDetailObject: Function
  notifier: BaseNotifier
  analytics: BaseAnalytic | undefined
  googleConfig: GoogleConfig | undefined
  ViewType: string
  user: object
  show: boolean
  submitChange: Function
}

const putMainDetailObjectToWizardContext = (submitChange: Function, mainDetailObject: DetailObject): void => {
  /*
    Often in the wizard we need access to main detail object, fetched in Detail View
  */
  submitChange({ url: '', payload: { mainDetailObject } })
}

const WizardContainer = (props: WizardContainerProps): JSX.Element => {
  const {
    wizard,
    provider,
    mainDetailObject,
    setMainDetailObject,
    refreshMainDetailObject,
    notifier,
    analytics,
    googleConfig,
    user,
    ViewType,
    show,
    submitChange,
  } = props
  const [currentState, setCurrentState] = React.useState<string>('begin')

  putMainDetailObjectToWizardContext(submitChange, mainDetailObject)

  const getMainWizardObject = (): object => {
    /*
      Similary with detail view, wizard has an object,
      wizard has an object on which the client's actions are performed in the wizard's script.
    */
    const context = containerStore.getState()
    return context.__initial__ || mainDetailObject
  }

  return (
    <WizardStepContainer
      wizard={wizard}
      wizardStep={wizard.stateWidgetMapping[currentState]}
      provider={provider}
      mainWizardObject={getMainWizardObject()}
      currentState={currentState}
      setCurrentState={setCurrentState}
      setMainDetailObject={setMainDetailObject}
      refreshMainDetailObject={refreshMainDetailObject}
      notifier={notifier}
      analytics={analytics}
      googleConfig={googleConfig}
      user={user}
      ViewType={ViewType}
      show={show}
      submitChange={submitChange}
    />
  )
}

export { WizardContainer }
