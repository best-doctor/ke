import * as React from 'react'
import { mount } from 'enzyme'
import { ThemeProvider } from '@chakra-ui/core'

import { WizardStepContainer } from '../../components/WizardStepContainer'
import { testWizard, testProvider, testNotifier, testWizardStep } from '../../../setupTests'

jest.mock('../../utils')
jest.mock('../../../integration/analytics/utils')

const getComponent = (): JSX.Element => {
  const currentState = 'begin'
  const ViewType = 'test_view'
  const setMainDetailObject = jest.fn()
  const analytics = undefined
  const googleConfig = undefined
  const user = {}

  return (
    <ThemeProvider>
      <WizardStepContainer
        wizardStep={testWizardStep}
        wizard={testWizard}
        provider={testProvider}
        mainWizardObject={{ id: 100500 }}
        setMainDetailObject={setMainDetailObject}
        notifier={testNotifier}
        analytics={analytics}
        googleConfig={googleConfig}
        ViewType={ViewType}
        user={user}
        show
        submitChange={jest.fn()}
        currentState={currentState}
        setCurrentState={jest.fn()}
      />
    </ThemeProvider>
  )
}

test('Wizard step container', () => {
  mount(getComponent())
})
