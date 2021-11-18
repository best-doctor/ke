import React, { MutableRefObject } from 'react'
import { Box, chakra } from '@chakra-ui/react'
import { Wizard } from './components'

import { getWizardFromCallable } from './utils'

import type { WizardFieldDescription, WizardFieldElement } from '../admin/fields/FieldDescription'
import type { BaseNotifier } from '../common/notifier'
import type { Provider } from '../admin/providers/interfaces'
import type { BaseAnalytic } from '../integration/analytics'
import type { DetailObject, WizardControl } from '../typing'

type MountWizardsKwargs = {
  resourceName: string
  mainDetailObject: DetailObject
  notifier: BaseNotifier
  ViewType: string
  elements: WizardFieldDescription
  elementsKey: string
  provider: Provider
  setMainDetailObject: Function
  refreshMainDetailObject: Function
  analytics: BaseAnalytic | undefined
  user: object
  activeWizardRef: MutableRefObject<WizardControl | null>
}

const WizardWrapper = chakra(Box, {
  baseStyle: {
    borderTop: '1px solid',
    borderColor: 'blackAlpha.300',
    _empty: {
      border: 0,
    },
  },
})

function isWizardEmpty({ elements, mainDetailObject }: MountWizardsKwargs): boolean {
  return elements.every((wizardInstance) => !getWizardFromCallable(wizardInstance, mainDetailObject))
}

const mountWizards = (kwargs: MountWizardsKwargs): JSX.Element => {
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
    elementsKey,
    provider,
    setMainDetailObject,
    refreshMainDetailObject,
    analytics,
    user,
    resourceName,
    activeWizardRef,
  } = kwargs

  return (
    <WizardWrapper border={isWizardEmpty(kwargs) ? 0 : undefined} key={elementsKey}>
      {elements.map((wizardInstance: WizardFieldElement, index) => {
        const wizard = getWizardFromCallable(wizardInstance, mainDetailObject)
        const key = `wizard-element_${index}`
        if (!wizard) {
          return <div key={key} />
        }
        return (
          <Wizard
            key={wizard.title}
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
            activeWizardRef={activeWizardRef}
          />
        )
      })}
    </WizardWrapper>
  )
}

export { mountWizards }
