import React, { useEffect } from 'react'
import { Box, Flex, Text } from '@chakra-ui/react'
import { Row, Col } from 'react-flexbox-grid'
import { useStore } from 'effector-react'

import { WizardStepComponents } from './WizardStepComponents'
import { WizardStepControlPanel } from './WizardStepControlPanel'

import type { BaseWizardStep, BaseWizard } from '../../interfaces'
import { containerErrorsStore, containerStore, initialStore } from '../../store'

import type { BaseNotifier } from '../../../common/notifier'
import type { Provider } from '../../../admin/providers/interfaces'
import type { BaseAnalytic } from '../../../integration/analytics/base'
import type { WizardObject } from '../../../typing'
import { ErrorBoundary } from '../../../common/components/ErrorBoundary'
import { useCreateTestId } from '../../../django-spa/aspects'
import { WizardValidationErrors } from './WizardValidationErrors'

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
  const { widgets: elements, title: stepTitle } = wizardStep

  const title = stepTitle || wizard.title

  let { resourceName } = wizardStep

  if (!resourceName) {
    resourceName = ''
  }

  if (show) {
    const wizardContext = { ...initialStore.getState(), ...containerStore.getState() }
    wizardStep.beforeShow({ ...props, context: wizardContext, updateContext: submitChange })
  }

  const errors = useStore(containerErrorsStore)

  useEffect(() => {
    if (show) {
      const errorBlock = document.querySelector('[data-has-error="true"]')
      if (errorBlock) {
        errorBlock.scrollIntoView({ behavior: 'smooth', block: 'center' })
        const control = errorBlock.querySelector<HTMLInputElement | HTMLSelectElement>('input, textarea, select')
        control && control.focus()
      }
    }
  })

  const { getDataTestId } = useCreateTestId()

  return (
    <>
      {show && (
        <Row>
          <Col xs={12}>
            <Box ref={wizardStepRef} py={8}>
              <Row>
                <Col xs={12}>
                  <Text
                    as="h2"
                    key="header"
                    fontSize="3xl"
                    color="black"
                    fontWeight="medium"
                    lineHeight="9"
                    data-grid={{ x: 1, y: 0, w: 10, h: 1, static: true }}
                    {...getDataTestId({ name: '-title' })}
                  >
                    {title}
                  </Text>
                </Col>
              </Row>
              <ErrorBoundary>
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
                        errors={errors.filter((error) => !error.widgetName).map(({ errorText }) => errorText)}
                      />
                    </Box>
                    <Flex alignItems="center" key="steps">
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
                        setMainDetailObject={setMainDetailObject}
                        notifier={notifier}
                        {...getDataTestId({ name: '-controlPanel' })}
                      />
                    </Flex>
                  </Col>
                </Row>
              </ErrorBoundary>
            </Box>
          </Col>
        </Row>
      )}
    </>
  )
}

export { WizardStepContainer }
