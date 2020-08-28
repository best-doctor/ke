import { submitChange } from './controllers'

import type { BaseWizard } from './interfaces'
import type { WizardFieldElement } from '../admin/fields/FieldDescription'

const clearInitialObjectState = (): { payload: object } => submitChange({ payload: { __initial__: null } })

const getWizardFromCallable = (wizardInstance: WizardFieldElement, object: object): BaseWizard | null => {
  /*
    We need this for unpacking wizard instance with conditions.
  */
  if (typeof wizardInstance === 'function') {
    return wizardInstance(object)
  }

  return wizardInstance
}

export { getWizardFromCallable, clearInitialObjectState }
