import type { BaseWizardStep } from './interfaces'

type Style = Record<string, any>

type WizardStepButtonDescription = {
  style: Style
  handler: (props: any) => Promise<string>
  label: string | undefined
  name: string
}

const getPrevButton = (
  wizardStep: BaseWizardStep,
  style?: Style,
  label?: string,
  name?: string
): WizardStepButtonDescription => {
  const { prev } = wizardStep
  return {
    style: style || { variant: 'ghost', mr: 5 },
    handler: prev,
    label: label || wizardStep.backStepLabel,
    name: name || 'prev',
  }
}

const getNextButton = (
  wizardStep: BaseWizardStep,
  style?: Style,
  label?: string,
  name?: string
): WizardStepButtonDescription => {
  const { next, validatedNext, requireValidation } = wizardStep

  return {
    style: style || { colorScheme: 'blue', m: 5 },
    handler: requireValidation ? validatedNext : next,
    label: label || wizardStep.forwardStepLabel,
    name: name || 'next',
  }
}

const getDefaultButtons = (wizardStep: BaseWizardStep): WizardStepButtonDescription[] => [
  getPrevButton(wizardStep),
  getNextButton(wizardStep),
]

export { WizardStepButtonDescription, getPrevButton, getNextButton, getDefaultButtons }
