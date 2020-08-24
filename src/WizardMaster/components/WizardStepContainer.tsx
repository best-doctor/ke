import * as React from 'react'

import { Heading, Button, Box } from '@chakra-ui/core'

import type { DetailFieldDescription } from 'admin/fields/FieldDescription'

import { containerStore, containerErrorsStore } from '../store'
import { setInitialValue } from '../controllers'
import { mountComponents } from '../../common/utils/mountComponents'

import type { BaseNotifier } from '../../common/notifier'
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
  show: boolean
  submitChange: Function
}

type WizardStepComponentsProps = {
  elements: DetailFieldDescription[]
  resourceName: string
  provider: BaseProvider
  object: object
  setObject: Function
  notifier: BaseNotifier
  analytics: BaseAnalytic
  user: object
  ViewType: string
  submitChange: Function
}

type WizardStepControlPanelProps = {
  wizardStep: BaseWizardStep
  wizard: BaseWizard
  submitChange: Function
  currentState: string
  setCurrentState: Function
  provider: BaseProvider
  object: object
}

const clearStorage = (elements: DetailFieldDescription[], storage: { [key: string]: object | null }): void => {
  const storeToClear = storage

  elements.forEach((element: DetailFieldDescription) => {
    storeToClear[element.name] = null
  })
}

const WizardStepComponents = (props: WizardStepComponentsProps): JSX.Element => {
  const {
    elements,
    resourceName,
    provider,
    object,
    setObject,
    notifier,
    analytics,
    user,
    ViewType,
    submitChange,
  } = props
  return (
    <>
      {mountComponents({
        setInitialValue,
        submitChange,
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
    </>
  )
}

const WizardStepControlPanel = (props: WizardStepControlPanelProps): JSX.Element => {
  const { wizardStep, wizard, submitChange, currentState, setCurrentState } = props

  const getWizardStepControlPayload = (): object => ({
    ...props,
    context: containerStore.getState(),
    updateContext: submitChange,
  })

  return (
    <>
      <Button
        variant="ghost"
        mr={3}
        onClick={() => {
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

const WizardValidationErrors = ({ errors }: { errors: string[] }): JSX.Element => {
  const ErrorDisplay = (): JSX.Element => (
    <Box m={5}>
      <Heading size="sm">Пожалуйста, исправьте ошибки ниже:</Heading>
      <ul>
        {errors.map((error: string) => (
          <li style={{ color: 'red' }}>{error}</li>
        ))}
      </ul>
    </Box>
  )

  if (errors.length > 0) {
    return <ErrorDisplay />
  }
  return <></>
}

const executeScroll = (whereTo = 0): void => window.scrollTo(0, whereTo)

const WizardStepContainer = (props: WizardViewContainerProps): JSX.Element => {
  const wizardStepRef = React.useRef<HTMLElement | null>(null)

  const {
    wizard,
    wizardStep,
    provider,
    object,
    setObject,
    notifier,
    analytics,
    user,
    ViewType,
    show,
    currentState,
    setCurrentState,
    submitChange,
  } = props

  React.useEffect(() => {
    if (show === true && wizardStepRef.current !== null) {
      executeScroll(wizardStepRef.current.offsetHeight)
    }
  })

  const { widgets: elements } = wizardStep
  let { resourceName } = wizardStep

  if (!resourceName) {
    resourceName = ''
  }

  clearStorage(elements, containerStore.getState())

  return (
    <>
      {show && (
        <Box
          ref={wizardStepRef}
          mt={4}
          borderWidth="2px"
          borderRadius="md"
          height={500}
          p={5}
          borderColor="gray.300"
          overflow="scroll"
        >
          <Heading size="md">{wizard.title}</Heading>
          <WizardStepComponents
            elements={elements}
            resourceName={resourceName}
            provider={provider}
            object={object}
            setObject={setObject}
            notifier={notifier}
            analytics={analytics}
            user={user}
            ViewType={ViewType}
            submitChange={submitChange}
          />
          <WizardValidationErrors errors={containerErrorsStore.getState()} />
          <WizardStepControlPanel
            wizardStep={wizardStep}
            wizard={wizard}
            provider={provider}
            currentState={currentState}
            setCurrentState={setCurrentState}
            object={object}
            submitChange={submitChange}
          />
        </Box>
      )}
    </>
  )
}

export { WizardStepContainer }
