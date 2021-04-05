/* eslint max-classes-per-file: 0 */

import { BaseWizardStep } from './interfaces'

import { ReadOnlyWidget } from '../DetailView/widgets/ReadOnlyWidget'

type CreatedObject = {
  id?: number
  uuid?: string
  code?: string
}
const defaultLayout = { x: 1, y: 1, w: 12 }

class ErrorDisplay extends BaseWizardStep {
  widgets = [
    {
      name: 'error_page',
      widget: ReadOnlyWidget,
      displayValue: (_: any): string => 'Произошла  ошибка обработки визарда',
      layout: defaultLayout,
    },
  ]
}

class SuccessDisplay extends BaseWizardStep {
  widgets = [
    {
      name: 'success_page',
      widget: ReadOnlyWidget,
      displayValue: (object: CreatedObject): string =>
        `Создан объект с номером ${object.code || object.uuid || object.id}`,
      layout: defaultLayout,
    },
  ]
}

export { SuccessDisplay, ErrorDisplay }
