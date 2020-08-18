import * as React from 'react'
import { Wizard } from './components'
import { WrappedLocalStorage } from '../store/localStorageWrapper'

import type { BaseNotifier } from '../utils/notifier'
import type { BaseProvider } from '../admin/providers/index'
import type { BaseWizard } from './interfaces'
import type {
  WizardFieldDescription,
  WizardFieldElement,
  DetailFieldDescription,
} from '../admin/fields/FieldDescription'
import type { BaseAnalytic } from '../integration/analytics/base'

type MountWizardsKwargs = {
  object: object
  notifier: BaseNotifier
  ViewType: string
  elements: WizardFieldDescription
  provider: BaseProvider
  setObject: Function
  analytics: BaseAnalytic
  user: object
}

const collectPayloadFromContext = (widgets: DetailFieldDescription[]): { [key: string]: object } => {
  const payload = {}

  // eslint-disable-next-line
  for (const widget of widgets) {
    const { name: widgetKey } = widget
    const widgetValue = WrappedLocalStorage.popItem(widgetKey)

    if (widget.targetPayload && typeof widget.targetPayload === 'function' && widgetValue) {
      // check that widget payload handler exists
      Object.assign(payload, widget.targetPayload(widgetValue))
    } else {
      Object.assign(payload, { [widgetKey]: widgetValue })
    }
  }

  return payload
}

const getWizardFromCallable = (wizardInstance: WizardFieldElement, object: object): BaseWizard => {
  if (typeof wizardInstance === 'function') {
    return wizardInstance(object)
  }

  return wizardInstance
}

const mountWizards = (kwargs: MountWizardsKwargs): JSX.Element[] => {
  const { object, notifier, ViewType, elements, provider, setObject, analytics, user } = kwargs

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
      />
    )
  })
}

export { mountWizards, collectPayloadFromContext }
