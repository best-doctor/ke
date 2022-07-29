// Это легаси
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useMemo, useRef } from 'react'
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

import { useSaveEvent } from '../../../DetailView/SaveEvent/SaveEventProvider'
import { clearErrors } from '../../events'

type WizardStepContainerRef = HTMLDivElement | null

type WizardViewContainerProps = {
  wizard: BaseWizard
  wizardStep: BaseWizardStep
  provider: Provider
  mainWizardObject: WizardObject
  setMainDetailObject: Function
  refreshMainDetailObject: Function
  notifier: BaseNotifier
  analytics?: BaseAnalytic
  currentState: string
  setCurrentState: Function
  ViewType: string
  user: object
  show: boolean
  submitChange: Function
}

const headerDataGrid = { x: 1, y: 0, w: 10, h: 1, static: true }

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

  useEffect(() => {
    if (show) {
      const wizardContext = { ...initialStore.getState(), ...containerStore.getState() }
      wizardStep.beforeShow({ ...props, context: wizardContext, updateContext: submitChange })
    }
  }, [props, show, submitChange, wizardStep, wizardStep.beforeShow])

  const errors = useStore(containerErrorsStore)
  const errorMessages = useMemo(
    () => errors.filter((error) => !error.widgetName).map(({ errorText }) => errorText),
    [errors]
  )

  useEffect(() => () => clearErrors(), [])

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
  const paddings = useMemo(() => (title ? { py: 8 } : { pb: 8 }), [title])

  const { on, off } = useSaveEvent()

  const propsRef = useRef(props)
  useEffect(() => {
    propsRef.current = props
  }, [props])

  useEffect(() => {
    const handler = (): Promise<boolean> | void => {
      if (!wizardStep?.onSave) {
        return
      }
      const wizardContext = { ...initialStore.getState(), ...containerStore.getState() }
      return wizardStep.onSave(
        {
          ...propsRef.current,
          context: wizardContext,
          updateContext: submitChange,
        },
        (step: string) => {
          setCurrentState(wizard.transition(currentState, step))
        }
      )
    }
    on(handler)
    return () => {
      off(handler)
    }
  }, [currentState, off, on, setCurrentState, submitChange, wizard, wizardStep])

  return (
    <>
      {show && (
        <Row>
          <Col xs={12}>
            <Box ref={wizardStepRef} {...paddings}>
              <Row>
                <Col xs={12}>
                  <Text
                    as="h2"
                    key="header"
                    fontSize="3xl"
                    color="black"
                    fontWeight="medium"
                    lineHeight="9"
                    data-grid={headerDataGrid}
                    {...getDataTestId({ name: wizardStep.name, postfix: '--title' })}
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
                      <WizardValidationErrors errors={errorMessages} />
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
                        {...getDataTestId({ name: wizardStep.name, postfix: '--controlPanel' })}
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
