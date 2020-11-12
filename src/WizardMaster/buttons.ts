import type { BaseWizardStep } from './interfaces'

type Style = Record<string, any>

type WizardStepButtonDescription = {
  style: Style
  handler: Function
  label: string | undefined
  analyticsTarget: string
}

const getPrevButton = (
  wizardStep: BaseWizardStep,
  style?: Style,
  label?: string,
  analyticsTarget?: string
): WizardStepButtonDescription => {
  const { prev } = wizardStep
  return {
    style: style || { variant: 'ghost', mr: 5 },
    handler: prev,
    label: label || wizardStep.backStepLabel,
    analyticsTarget: analyticsTarget || 'wizard_prev_step',
  }
}

const getNextButton = (
  wizardStep: BaseWizardStep,
  style?: Style,
  label?: string,
  analyticsTarget?: string
): WizardStepButtonDescription => {
  const { next, validatedNext, requireValidation } = wizardStep

  return {
    style: style || { variantColor: 'blue', m: 5 },
    handler: requireValidation ? validatedNext : next,
    label: label || wizardStep.forwardStepLabel,
    analyticsTarget: analyticsTarget || 'wizard_next_step',
  }
}

const getDefaultButtons = (wizardStep: BaseWizardStep): WizardStepButtonDescription[] => {
  return [getPrevButton(wizardStep), getNextButton(wizardStep)]
}

export { WizardStepButtonDescription, getPrevButton, getNextButton, getDefaultButtons }
