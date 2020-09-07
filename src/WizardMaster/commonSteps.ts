/* eslint max-classes-per-file: 0 */

import { BaseWizardStep } from './interfaces'

import { TextWidget } from '../DetailView/widgets/TextWidget'

const defaultLayout = { x: 1, y: 1, w: 10, h: 1, static: true }

class ErrorDisplay extends BaseWizardStep {
  widgets = [
    {
      name: 'error_page',
      widget: TextWidget,
      displayValue: (_: any) => 'Произошла  ошибка обработки визарда',
      layout: defaultLayout,
    },
  ]
}

class SuccessDisplay extends BaseWizardStep {
  widgets = [
    {
      name: 'success_page',
      widget: TextWidget,
      displayValue: (object: any) => `Создан объект с номером ${object.code || object.uuid || object.id}`,
      layout: defaultLayout,
    },
  ]
}

export { SuccessDisplay, ErrorDisplay }
