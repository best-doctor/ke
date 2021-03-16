import React from 'react'
import { Button } from '@chakra-ui/core'

import { containerStore, initialStore } from '../../store'

import type { Provider } from '../../../admin/providers/interfaces'
import type { BaseWizard, BaseWizardStep } from '../../interfaces'
import type { BaseAnalytic } from '../../../integration/analytics/base'
import { EventNameEnum, WidgetTypeEnum } from '../../../integration/analytics/firebase/enums'
import { pushAnalytics } from '../../../integration/analytics'
import type { WizardObject } from '../../../typing'

type WizardStepControlPanelProps = {
  wizardStep: BaseWizardStep
  wizard: BaseWizard
  submitChange: Function
  currentState: string
  setCurrentState: Function
  provider: Provider
  mainWizardObject: WizardObject
  analytics: BaseAnalytic | undefined
  refreshMainDetailObject: Function
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
    objectForAnalytics: props.mainWizardObject,
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

  const { getButtons } = wizardStep
  const buttons = getButtons.call(wizardStep, getWizardStepControlPayload())

  return (
    <>
      {buttons.map((button) => {
        return (
          <Button
            key={button.name}
            {...button.style}
            onClick={() => {
              sendPushAnalytics(
                wizardStep.resourceName ? wizardStep.resourceName : '',
                `wizard_${button.name}_step`,
                currentState,
                props
              )
              button.handler.call(wizardStep, getWizardStepControlPayload()).then((action: string | undefined) => {
                if (action) {
                  setCurrentState(wizard.transition(currentState, action))
                }
              })
            }}
          >
            {button.label}
          </Button>
        )
      })}
    </>
  )
}

export { WizardStepControlPanel }
