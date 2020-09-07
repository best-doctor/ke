import { containerStore, initialStore } from './store'
import { clearErros, pushError, submitChange } from './controllers'
import type { BaseWizard } from './interfaces'
import type { WizardFieldElement, DetailFieldDescription } from '../admin/fields/FieldDescription'

const clearInitialObjectState = (): { payload: object } => submitChange({ payload: { __initial__: null } })

const clearStorage = (elements: DetailFieldDescription[], storage: { [key: string]: object | null }): void => {
  const storeToClear = storage

  elements.forEach((element: DetailFieldDescription) => {
    storeToClear[element.name] = null
  })
}

const getWizardFromCallable = (wizardInstance: WizardFieldElement, object: object): BaseWizard | null => {
  /*
    We need this for unpacking wizard instance with conditions.
  */
  if (typeof wizardInstance === 'function') {
    return wizardInstance(object)
  }

  return wizardInstance
}

const validateContext = (widgets: any): void => {
  clearErros()

  const wizardContext = { ...initialStore.getState(), ...containerStore.getState() }

  widgets.forEach((widget: any) => {
    const widgetContent = wizardContext[widget.name]
    if (widget.required === true && !widgetContent) {
      pushError(`Поле ${widget.helpText} обязательно`)
    }
  })
}

export { getWizardFromCallable, clearInitialObjectState, clearStorage, validateContext }
