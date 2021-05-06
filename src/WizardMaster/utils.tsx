import { containerStore, initialStore } from './store'
import { clearErros, pushError, submitChange } from './controllers'
import type { BaseWizard } from './interfaces'
import type { WizardFieldElement, DetailFieldDescription } from '../admin/fields/FieldDescription'
import { getAccessorWithDefault } from '../DetailView/utils/dataAccess'
import { Accessor, WizardObject } from '../typing'

type WidgetType = {
  widgets?: WidgetType[]
  required: Accessor<boolean>
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

const validateRequiredWidgets = (
  widgets: WidgetType[],
  mainWizardObject: WizardObject,
  wizardContext: { [key: string]: any }
): void => {
  widgets.forEach((widget: WidgetType) => {
    if (widget?.widgets) {
      validateRequiredWidgets(widget.widgets, mainWizardObject, wizardContext)
    } else {
      const isRequired = getAccessorWithDefault(widget.required, mainWizardObject, wizardContext, false)
      const widgetContent = wizardContext[widget.name]
      if (isRequired === true && !widgetContent) {
        pushError({ widgetName: widget.name, errorText: `Поле ${widget.helpText} обязательно` })
      }
    }
  })
}

const validateContext = (widgets: any, mainWizardObject: WizardObject): void => {
  clearErros()

  const wizardContext = { ...initialStore.getState(), ...containerStore.getState() }

  validateRequiredWidgets(widgets, mainWizardObject, wizardContext)
}

export { getWizardFromCallable, clearInitialObjectState, clearStorage, validateContext }
