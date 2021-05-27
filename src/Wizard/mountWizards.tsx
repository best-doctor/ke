import React from 'react'
import { Box } from '@chakra-ui/react'

import type { WizardFieldDescription, WizardFieldElement } from '../admin/fields/FieldDescription'
import type { BaseNotifier } from '../common/notifier'
import type { Provider } from '../admin/providers/interfaces'
import type { BaseAnalytic } from '../integration/analytics'
import type { DetailObject } from '../typing'
import { getAccessor } from '../DetailView/utils/dataAccess'
import { containerStore } from './store'
import { setInitialValue } from './controllers'

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
}

const mountWizards = (kwargs: MountWizardsKwargs): JSX.Element => {
  /*
    Function mounts widgets for Wizard View.

    Widgets of Wizard View type use store.
    They do not send user data to the backend immediately, but put it in store.
  */

  const { mainDetailObject, elements, elementsKey } = kwargs

  return (
    <Box key={elementsKey}>
      {elements.map((wizardInstance: WizardFieldElement, index) => {
        const Wizard = getAccessor(wizardInstance, mainDetailObject)
        const key = `wizard-element_${index}`
        if (!Wizard) {
          return <div key={key} />
        }
        return <Wizard {...kwargs} containerStore={containerStore} setInitialValue={setInitialValue} />
      })}
    </Box>
  )
}

export { mountWizards }
