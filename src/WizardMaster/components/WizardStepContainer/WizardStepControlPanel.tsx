import React, { useState } from 'react'

import { Flex } from '@chakra-ui/react'
import { Button } from '@cdk/Controls'
import { containerErrorsStore, containerStore, initialStore } from '../../store'
import type { Provider } from '../../../admin/providers/interfaces'
import type { BaseWizard, BaseWizardStep } from '../../interfaces'
import type { BaseAnalytic } from '../../../integration/analytics/base'
import { EventNameEnum, WidgetTypeEnum } from '../../../integration/analytics/firebase/enums'
import { pushAnalytics } from '../../../integration/analytics'
import type { WizardObject } from '../../../typing'
import { BaseNotifier } from '../../../common/notifier'
import { validateContext } from '../../utils'
import { clearErros } from '../../controllers'

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
  notifier: BaseNotifier
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
  const { wizardStep, wizard, submitChange, currentState, setCurrentState, mainWizardObject } = props
  const [isDisabled, setIsDisabled] = useState(false)

  const getWizardStepControlPayload = (): object => {
    const wizardContext = { ...initialStore.getState(), ...containerStore.getState() }

    return {
      ...props,
      context: wizardContext,
      updateContext: submitChange,
    }
  }

  const { getButtons, widgets } = wizardStep
  const buttons = getButtons.call(wizardStep, getWizardStepControlPayload())

  return (
    <Flex alignItems="center" flexGrow={1} mt={8} {...wizardStep.wrapperProps}>
      {buttons.map((button) => (
        <Button
          key={button.name}
          ml={2}
          _first={{
            ml: 0,
          }}
          {...button.style}
          isDisabled={isDisabled}
          onClick={() => {
            setIsDisabled(true)
            sendPushAnalytics(
              wizardStep.resourceName ? wizardStep.resourceName : '',
              `wizard_${button.name}_step`,
              currentState,
              props
            )

            if (button.needErrorClean) {
              clearErros()
            }
            if (button.needValidation) {
              validateContext(widgets, mainWizardObject)
              if (containerErrorsStore.getState().length > 0) {
                return setCurrentState('invalid_form')
              }
            }

            return button.handler
              .call(wizardStep, getWizardStepControlPayload())
              .then((action: string | undefined) => {
                if (action) {
                  setCurrentState(wizard.transition(currentState, action))
                }
              })
              .finally(() => setIsDisabled(false))
          }}
        >
          {button.label}
        </Button>
      ))}
      {wizardStep.customButtons}
    </Flex>
  )
}

export { WizardStepControlPanel }
