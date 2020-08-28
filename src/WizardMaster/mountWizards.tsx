import * as React from 'react'
import { Wizard } from './components'

import { getWizardFromCallable } from './utils'

import type { WizardFieldDescription, WizardFieldElement } from '../admin/fields/FieldDescription'
import type { BaseNotifier } from '../common/notifier'
import type { BaseProvider } from '../admin/providers/index'
import type { BaseAnalytic } from '../integration/analytics'

type MountWizardsKwargs = {
  resourceName: string
  object: object
  notifier: BaseNotifier
  ViewType: string
  elements: WizardFieldDescription
  provider: BaseProvider
  setObject: Function
  analytics: BaseAnalytic | undefined
  user: object
}

const mountWizards = (kwargs: MountWizardsKwargs): JSX.Element[] => {
  const { object, notifier, ViewType, elements, provider, setObject, analytics, user, resourceName } = kwargs

  return elements.map((wizardInstance: WizardFieldElement) => {
    const wizard = getWizardFromCallable(wizardInstance, object)

    if (!wizard) return <></>

    return (
      <Wizard
        key="wizard-element"
        data-grid={wizard.layout}
        wizard={wizard}
        provider={provider}
        object={object}
        setObject={setObject}
        notifier={notifier}
        analytics={analytics}
        ViewType={ViewType}
        user={user}
        resourceName={resourceName}
      />
    )
  })
}

export { mountWizards }
