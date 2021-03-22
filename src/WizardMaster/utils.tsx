import { containerStore, initialStore } from './store'
import { clearErros, pushError, submitChange } from './controllers'
import type { BaseWizard } from './interfaces'
import type { WizardFieldElement, DetailFieldDescription } from '../admin/fields/FieldDescription'

type WidgetType = {
  widgets?: WidgetType[]
  required: boolean
  helpText: string
  name: string
}

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

    There are times when we show the button to launch the wizard only under some condition.
    This is how it can be implemented in admin class:

    wizards = [
      (object: DetailObject) => {
        if (someCondition(object)) {
          return new MyWizard('My wizard name')
        }
        return null
      },
    ]
  */
  if (typeof wizardInstance === 'function') {
    return wizardInstance(object)
  }

  return wizardInstance
}

const validateRequiredWidgets = (widgets: WidgetType[], wizardContext: { [key: string]: any }): void => {
  widgets.forEach((widget: WidgetType) => {
    if (widget?.widgets) {
      validateRequiredWidgets(widget.widgets, wizardContext)
    } else {
      const widgetContent = wizardContext[widget.name]
      if (widget.required === true && !widgetContent) {
        pushError(`Поле ${widget.helpText} обязательно`)
      }
    }
  })
}

const validateContext = (widgets: any): void => {
  clearErros()

  const wizardContext = { ...initialStore.getState(), ...containerStore.getState() }

  validateRequiredWidgets(widgets, wizardContext)
}

export { getWizardFromCallable, clearInitialObjectState, clearStorage, validateContext }
