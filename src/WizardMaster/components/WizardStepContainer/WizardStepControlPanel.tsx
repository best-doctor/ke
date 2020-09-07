import * as React from 'react'
import { Button } from '@chakra-ui/core'

import { containerStore, initialStore } from '../../store'

import type { BaseProvider } from '../../../admin/providers/index'
import type { BaseWizardStep, BaseWizard } from '../../interfaces'
import type { BaseAnalytic } from '../../../integration/analytics/base'
import { EventNameEnum, WidgetTypeEnum } from '../../../integration/analytics/firebase/enums'
import { pushAnalytics } from '../../../integration/analytics'

type WizardStepControlPanelProps = {
  wizardStep: BaseWizardStep
  wizard: BaseWizard
  submitChange: Function
  currentState: string
  setCurrentState: Function
  provider: BaseProvider
  object: object
  analytics: BaseAnalytic | undefined
}

const sendPushAnalytics = (
  resourceName: string,
  widgetName: string,
  currentState: string,
  props: WizardStepControlPanelProps
): void => {
  pushAnalytics({
    eventName: EventNameEnum.BUTTON_CLICK,
    widgetType: WidgetTypeEnum.ACTION,
    widgetName,
    viewType: 'wizard',
    resource: resourceName,
    value: currentState,
    ...props,
  })
}

const WizardStepControlPanel = (props: WizardStepControlPanelProps): JSX.Element => {
  const { wizardStep, wizard, submitChange, currentState, setCurrentState } = props

  const getWizardStepControlPayload = (): object => {
    const wizardContext = { ...initialStore.getState(), ...containerStore.getState() }

    return {
      ...props,
      context: wizardContext,
      updateContext: submitChange,
    }
  }

  return (
    <>
      <Button
        variant="ghost"
        mr={5}
        onClick={() => {
          sendPushAnalytics(
            wizardStep.resourceName ? wizardStep.resourceName : '',
            'wizard_prev_step',
            currentState,
            props
          )
          wizardStep
            .prevStep(getWizardStepControlPayload())
            .then((action: string) => setCurrentState(wizard.transition(currentState, action)))
        }}
      >
        {wizardStep.backStepLabel}
      </Button>
      <Button
        variantColor="blue"
        m={5}
        onClick={() => {
          sendPushAnalytics(
            wizardStep.resourceName ? wizardStep.resourceName : '',
            'wizard_next_step',
            currentState,
            props
          )
          wizardStep
            .nextStep(getWizardStepControlPayload())
            .then((action: string) => setCurrentState(wizard.transition(currentState, action)))
        }}
      >
        {wizardStep.forwardStepLabel}
      </Button>
    </>
  )
}

export { WizardStepControlPanel }
