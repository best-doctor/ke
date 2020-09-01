import * as React from 'react'
import { Heading, Box } from '@chakra-ui/core'

import { WizardStepComponents } from './WizardStepComponents'
import { WizardValidationErrors } from './WizardValidationErrors'
import { WizardStepControlPanel } from './WizardStepControlPanel'

import type { BaseWizardStep, BaseWizard } from '../../interfaces'
import { containerErrorsStore } from '../../store'

import type { BaseNotifier } from '../../../common/notifier'
import type { BaseProvider } from '../../../admin/providers/index'
import type { BaseAnalytic } from '../../../integration/analytics/base'

type WizardStepContainerRef = HTMLElement | null

type WizardViewContainerProps = {
  wizard: BaseWizard
  wizardStep: BaseWizardStep
  provider: BaseProvider
  object: object
  setObject: Function
  notifier: BaseNotifier
  analytics: BaseAnalytic | undefined
  currentState: string
  setCurrentState: Function
  ViewType: string
  user: object
  show: boolean
  submitChange: Function
}

const executeScroll = (whereTo = 0): void => window.scrollTo(0, whereTo)

const scrollToWizardContainer = (
  isContainerOpened: boolean,
  wizardContainerRef: React.RefObject<WizardStepContainerRef>
): void => {
  if (isContainerOpened === true && wizardContainerRef.current !== null) {
    executeScroll(wizardContainerRef.current.offsetHeight)
  }
}

const WizardStepContainer = (props: WizardViewContainerProps): JSX.Element => {
  const wizardStepRef = React.useRef<WizardStepContainerRef>(null)
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
  const { widgets: elements } = wizardStep

  React.useEffect(() => scrollToWizardContainer(show, wizardStepRef))

  let { resourceName } = wizardStep

  if (!resourceName) {
    resourceName = ''
  }

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
            analytics={analytics}
          />
        </Box>
      )}
    </>
  )
}

export { WizardStepContainer }
