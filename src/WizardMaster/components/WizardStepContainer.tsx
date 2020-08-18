import * as React from 'react'

import { ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button } from '@chakra-ui/core'

import type { DetailFieldDescription } from 'admin/fields/FieldDescription'

import { mountComponents } from '../../utils/mountComponents'
import { WrappedLocalStorage } from '../../store/localStorageWrapper'

import type { BaseNotifier } from '../../utils/notifier'
import type { BaseProvider } from '../../admin/providers/index'
import type { BaseWizardStep, BaseWizard } from '../interfaces'
import type { BaseAnalytic } from '../../integration/analytics/base'

type WizardViewContainerProps = {
  wizard: BaseWizard
  wizardStep: BaseWizardStep
  provider: BaseProvider
  object: object
  setObject: Function
  notifier: BaseNotifier
  analytics: BaseAnalytic
  currentState: string
  setCurrentState: Function
  ViewType: string
  user: object
}

const clearStorage = (elements: DetailFieldDescription[]): void => {
  elements.forEach((element: DetailFieldDescription) => WrappedLocalStorage.popItem(element.name))
}

const WizardStepContainer = (props: WizardViewContainerProps): JSX.Element => {
  const {
    wizard,
    wizardStep,
    provider,
    object,
    setObject,
    notifier,
    analytics,
    currentState,
    setCurrentState,
    user,
    ViewType,
  } = props
  let { resourceName } = wizardStep
  const { widgets: elements } = wizardStep

  clearStorage(elements)

  if (!resourceName) {
    resourceName = ''
  }

  return (
    <>
      <ModalHeader>{wizard.title}</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        {mountComponents({
          resourceName,
          object,
          elements,
          provider,
          setObject,
          notifier,
          user,
          analytics,
          ViewType,
        })}
      </ModalBody>

      <ModalFooter>
        <Button
          variant="ghost"
          mr={3}
          onClick={() => {
            wizardStep.prev(props).then((action: string) => setCurrentState(wizard.transition(currentState, action)))
          }}
        >
          {wizardStep.backStepLabel}
        </Button>
        <Button
          variantColor="blue"
          onClick={() => {
            wizardStep.next(props).then((action: string) => setCurrentState(wizard.transition(currentState, action)))
          }}
        >
          {wizardStep.forwardStepLabel}
        </Button>
      </ModalFooter>
    </>
  )
}

export { WizardStepContainer }
