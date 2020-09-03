/* eslint max-classes-per-file: 0 */
/* eslint class-methods-use-this: ["error", { "exceptMethods": ["next", "prev"] }] */

import { containerErrorsStore } from '../store'
import { validateContext } from '../utils'
import type { DetailFieldDescription } from '../../admin/fields/FieldDescription'

type WizardState = Promise<string>

type WizardPayload = { [key: string]: any }

const defaultLayout = { x: 1, y: 1, w: 10, h: 2, static: true }

abstract class BaseWizardStep {
  title: string

  resourceName?: string

  forwardStepLabel?: string = 'Далее'

  backStepLabel?: string = 'Назад'

  abstract widgets: DetailFieldDescription[]

  constructor(title: string, resourceName?: string | undefined) {
    this.title = title
    this.resourceName = resourceName
  }

  next(_: WizardPayload): WizardState {
    return Promise.resolve('forward')
  }

  prev(_: WizardPayload): WizardState {
    return Promise.resolve('back')
  }

  nextStep(props: WizardPayload): WizardState {
    validateContext(this.widgets)

    if (containerErrorsStore.getState().length > 0) {
      return Promise.resolve('invalid_form')
    }

    return this.next(props)
  }

  prevStep(props: WizardPayload): WizardState {
    return this.prev(props)
  }
}

abstract class BaseWizard {
  title: string

  layout?: object = defaultLayout

  abstract stateWidgetMapping: { [key: string]: BaseWizardStep }

  abstract machine: { [key: string]: object | string }

  constructor(title: string) {
    this.title = title
  }

  transition(currentState: string, action: string): string {
    const state = this.machine[currentState]

    return state[action as keyof typeof state]
  }
}

export { BaseWizardStep, WizardState, BaseWizard }
