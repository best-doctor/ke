import React from 'react'
import { Wizard } from './components'

import { getWizardFromCallable } from './utils'

import type { WizardFieldDescription, WizardFieldElement } from '../admin/fields/FieldDescription'
import type { BaseNotifier } from '../common/notifier'
import type { Provider } from '../admin/providers/interfaces'
import type { BaseAnalytic } from '../integration/analytics'
import type { DetailObject } from '../typing'

type MountWizardsKwargs = {
  resourceName: string
  mainDetailObject: DetailObject
  notifier: BaseNotifier
  ViewType: string
  elements: WizardFieldDescription
  provider: Provider
  setMainDetailObject: Function
  refreshMainDetailObject: Function
  analytics: BaseAnalytic | undefined
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
    refreshMainDetailObject,
    analytics,
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
        refreshMainDetailObject={refreshMainDetailObject}
        notifier={notifier}
        analytics={analytics}
        ViewType={ViewType}
        user={user}
        resourceName={resourceName}
        allowToggle={wizard.allowToggle}
        isExpanded={wizard.isExpanded}
      />
    )
  })
}

export { mountWizards }
