import React from 'react'
import { Heading, Box } from '@chakra-ui/react'
import { Row, Col } from 'react-flexbox-grid'

import { WizardStepComponents } from './WizardStepComponents'
import { WizardValidationErrors } from './WizardValidationErrors'
import { WizardStepControlPanel } from './WizardStepControlPanel'

import type { BaseWizardStep, BaseWizard } from '../../interfaces'
import { containerErrorsStore, containerStore, initialStore } from '../../store'

import type { BaseNotifier } from '../../../common/notifier'
import type { Provider } from '../../../admin/providers/interfaces'
import type { BaseAnalytic } from '../../../integration/analytics/base'
import type { WizardObject } from '../../../typing'

type WizardStepContainerRef = HTMLDivElement | null

type WizardViewContainerProps = {
  wizard: BaseWizard
  wizardStep: BaseWizardStep
  provider: Provider
  mainWizardObject: WizardObject
  setMainDetailObject: Function
  refreshMainDetailObject: Function
  notifier: BaseNotifier
  analytics: BaseAnalytic | undefined
  currentState: string
  setCurrentState: Function
  ViewType: string
  user: object
  show: boolean
  submitChange: Function
}

const WizardStepContainer = (props: WizardViewContainerProps): JSX.Element => {
  const wizardStepRef = React.useRef<WizardStepContainerRef>(null)
  const {
    wizard,
    wizardStep,
    provider,
    mainWizardObject,
    setMainDetailObject,
    refreshMainDetailObject,
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

  let { resourceName } = wizardStep

  if (!resourceName) {
    resourceName = ''
  }

  if (show) {
    const wizardContext = { ...initialStore.getState(), ...containerStore.getState() }
    wizardStep.beforeShow({ ...props, context: wizardContext, updateContext: submitChange })
  }

  return (
    <>
      {show && (
        <Row>
          <Col xs={12}>
            <Box
              ref={wizardStepRef}
              marginBottom="16px"
              borderTopWidth="1px"
              borderBottomWidth="1px"
              padding="8px"
              borderColor="gray.300"
            >
              <Row>
                <Col xs={12}>
                  <Heading key="header" size="md" data-grid={{ x: 1, y: 0, w: 10, h: 1, static: true }}>
                    {wizard.title}
                  </Heading>
                </Col>
              </Row>
              <WizardStepComponents
                elements={elements}
                resourceName={resourceName}
                provider={provider}
                mainWizardObject={mainWizardObject}
                setMainDetailObject={setMainDetailObject}
                refreshMainDetailObject={refreshMainDetailObject}
                notifier={notifier}
                analytics={analytics}
                user={user}
                ViewType={ViewType}
                submitChange={submitChange}
                setCurrentState={setCurrentState}
              />
              <Row>
                <Col xs={12}>
                  <Box key="errors">
                    <WizardValidationErrors
                      errors={containerErrorsStore.getState().map(({ errorText }) => errorText)}
                    />
                  </Box>
                  <Box key="steps">
                    <WizardStepControlPanel
                      wizardStep={wizardStep}
                      wizard={wizard}
                      provider={provider}
                      currentState={currentState}
                      setCurrentState={setCurrentState}
                      mainWizardObject={mainWizardObject}
                      submitChange={submitChange}
                      analytics={analytics}
                      refreshMainDetailObject={refreshMainDetailObject}
                      notifier={notifier}
                    />
                  </Box>
                </Col>
              </Row>
            </Box>
          </Col>
        </Row>
      )}
    </>
  )
}

export { WizardStepContainer }
