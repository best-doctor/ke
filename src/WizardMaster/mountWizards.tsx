import * as React from 'react'
import { Wizard } from './components'

import { getWizardFromCallable } from './utils'

import type { WizardFieldDescription, WizardFieldElement } from '../admin/fields/FieldDescription'
import type { BaseNotifier } from '../common/notifier'
import type { BaseProvider } from '../admin/providers/index'
import type { BaseAnalytic } from '../integration/analytics'
import type { DetailObject } from '../typing'
import type { GoogleConfig } from '../integration/google'

type MountWizardsKwargs = {
  resourceName: string
  mainDetailObject: DetailObject
  notifier: BaseNotifier
  ViewType: string
  elements: WizardFieldDescription
  provider: BaseProvider
  setMainDetailObject: Function
  analytics: BaseAnalytic | undefined
  googleConfig: GoogleConfig | undefined
  user: object
}

const mountWizards = (kwargs: MountWizardsKwargs): JSX.Element[] => {
  /*
    Function mounts widgets for Wizard View.

    Widgets of Wizard View type use store.
    They do not send user data to the backend immediately, but put it in store.
  */

  const {
    mainDetailObject,
    notifier,
    ViewType,
    elements,
    provider,
    setMainDetailObject,
    analytics,
    googleConfig,
    user,
    resourceName,
  } = kwargs

  return elements.map((wizardInstance: WizardFieldElement) => {
    const wizard = getWizardFromCallable(wizardInstance, mainDetailObject)

    if (!wizard) return <></>

    return (
      <Wizard
        key="wizard-element"
        data-grid={wizard.layout}
        wizard={wizard}
        provider={provider}
        mainDetailObject={mainDetailObject}
        setMainDetailObject={setMainDetailObject}
        notifier={notifier}
        analytics={analytics}
        googleConfig={googleConfig}
        ViewType={ViewType}
        user={user}
        resourceName={resourceName}
      />
    )
  })
}

export { mountWizards }
