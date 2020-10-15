import * as React from 'react'
import * as GridLayout from 'react-grid-layout'
import { Heading, Box } from '@chakra-ui/core'

import { WizardStepComponents } from './WizardStepComponents'
import { WizardValidationErrors } from './WizardValidationErrors'
import { WizardStepControlPanel } from './WizardStepControlPanel'

import type { BaseWizardStep, BaseWizard } from '../../interfaces'
import { containerErrorsStore } from '../../store'

import type { BaseNotifier } from '../../../common/notifier'
import type { BaseProvider } from '../../../admin/providers/index'
import type { BaseAnalytic } from '../../../integration/analytics/base'
import type { WizardObject } from '../../../typing'

const ReactGridLayout = GridLayout.WidthProvider(GridLayout)

type WizardStepContainerRef = HTMLElement | null

type WizardViewContainerProps = {
  wizard: BaseWizard
  wizardStep: BaseWizardStep
  provider: BaseProvider
  mainWizardObject: WizardObject
  setMainDetailObject: Function
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

  return (
    <>
      {show && (
        <Box ref={wizardStepRef} mt={4} borderTopWidth="2px" borderBottomWidth="2px" p={5} borderColor="gray.300">
          <ReactGridLayout key="wizardStepHeaderLayout" className="layout" cols={12} rowHeight={30}>
            <Heading key="header" size="md" data-grid={{ x: 1, y: 0, w: 10, h: 1, static: true }}>
              {wizard.title}
            </Heading>
          </ReactGridLayout>
          <WizardStepComponents
            elements={elements}
            resourceName={resourceName}
            provider={provider}
            mainWizardObject={mainWizardObject}
            setMainDetailObject={setMainDetailObject}
            notifier={notifier}
            analytics={analytics}
            user={user}
            ViewType={ViewType}
            submitChange={submitChange}
          />
          <ReactGridLayout key="wizardStepFooterLayout" className="layout" cols={12} rowHeight={30}>
            <Box key="errors" data-grid={{ x: 1, y: 1, w: 10, h: 1, static: true }}>
              <WizardValidationErrors errors={containerErrorsStore.getState()} />
            </Box>
            <Box key="steps" data-grid={{ x: 1, y: 1, w: 10, h: 1, static: true }}>
              <WizardStepControlPanel
                wizardStep={wizardStep}
                wizard={wizard}
                provider={provider}
                currentState={currentState}
                setCurrentState={setCurrentState}
                mainWizardObject={mainWizardObject}
                submitChange={submitChange}
                analytics={analytics}
              />
            </Box>
          </ReactGridLayout>
        </Box>
      )}
    </>
  )
}

export { WizardStepContainer }
