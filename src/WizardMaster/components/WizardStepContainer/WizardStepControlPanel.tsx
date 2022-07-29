// Это легаси
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react'

import { Flex } from '@chakra-ui/react'
import { Button } from '@cdk/Controls'
import { useStore } from 'effector-react'
import { containerErrorsStore, containerStore, initialStore } from '../../store'
import type { Provider } from '../../../admin/providers/interfaces'
import type { BaseWizard, BaseWizardStep } from '../../interfaces'
import type { BaseAnalytic } from '../../../integration/analytics/base'
import type { WizardObject } from '../../../typing'
import { BaseNotifier } from '../../../common/notifier'
import { validateContext } from '../../utils'
import { clearErrors } from '../../controllers'
import { WithDataTestId } from '../../../django-spa/aspects/test-id/types'

interface WizardStepControlPanelProps extends WithDataTestId {
  wizardStep: BaseWizardStep
  wizard: BaseWizard
  submitChange: Function
  currentState: string
  setCurrentState: Function
  provider: Provider
  mainWizardObject: WizardObject
  analytics?: BaseAnalytic
  refreshMainDetailObject: Function
  setMainDetailObject: Function
  notifier: BaseNotifier
}

const WizardStepControlPanel = (props: WizardStepControlPanelProps): JSX.Element => {
  const {
    wizardStep,
    wizard,
    submitChange,
    currentState,
    setCurrentState,
    mainWizardObject,
    'data-test-id': dataTestId,
  } = props
  const [buttonInHandling, setButtonInHandling] = useState<string | null>(null)

  const containerStoreValue = useStore(containerStore)
  const initialStoreValue = useStore(initialStore)

  const getWizardStepControlPayload = (): object => {
    const wizardContext = { ...initialStoreValue, ...containerStoreValue }

    return {
      ...props,
      context: wizardContext,
      updateContext: submitChange,
    }
  }

  const { getButtons, widgets } = wizardStep
  const buttons = getButtons.call(wizardStep, getWizardStepControlPayload())

  return (
    <Flex alignItems="center" flexGrow={1} mt={8} data-test-id={dataTestId} {...wizardStep.wrapperProps}>
      {buttons.map((button) => (
        <Button
          name={button.name}
          key={button.name}
          ml={2}
          _first={{
            ml: 0,
          }}
          {...button.style}
          isDisabled={button.isDisabled || !!buttonInHandling}
          isLoading={button.name === buttonInHandling}
          loadingText={button.onHandlingLabel ?? button.label}
          onClick={() => {
            setButtonInHandling(button.name)

            if (button.needErrorClean) {
              clearErrors()
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
              .finally(() => setButtonInHandling(null))
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
