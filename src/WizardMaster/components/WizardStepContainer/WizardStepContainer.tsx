import * as React from 'react'
import { Heading, Box } from '@chakra-ui/core'
import { Row, Col } from 'react-flexbox-grid'

import { WizardStepComponents } from './WizardStepComponents'
import { WizardValidationErrors } from './WizardValidationErrors'
import { WizardStepControlPanel } from './WizardStepControlPanel'

import type { BaseWizardStep, BaseWizard } from '../../interfaces'
import { containerErrorsStore, containerStore, initialStore } from '../../store'

import type { BaseNotifier } from '../../../common/notifier'
import type { BaseProvider } from '../../../admin/providers/index'
import type { BaseAnalytic } from '../../../integration/analytics/base'
import type { WizardObject } from '../../../typing'
import type { GoogleConfig } from '../../../integration/google'

type WizardStepContainerRef = HTMLElement | null

type WizardViewContainerProps = {
  wizard: BaseWizard
  wizardStep: BaseWizardStep
  provider: BaseProvider
  mainWizardObject: WizardObject
  setMainDetailObject: Function
  refreshMainDetailObject: Function
  notifier: BaseNotifier
  analytics: BaseAnalytic | undefined
  googleConfig: GoogleConfig | undefined
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
    googleConfig,
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
                googleConfig={googleConfig}
                user={user}
                ViewType={ViewType}
                submitChange={submitChange}
              />
              <Row>
                <Col xs={12}>
                  <Box key="errors">
                    <WizardValidationErrors errors={containerErrorsStore.getState()} />
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
