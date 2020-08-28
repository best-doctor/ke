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
  const setObject = jest.fn()
  const analytics = undefined
  const user = {}

  return (
    <ThemeProvider>
      <WizardStepContainer
      wizardStep={testWizardStep}
      wizard={testWizard}
      provider={testProvider}
      object={{ id: 100500 }}
      setObject={setObject}
      notifier={testNotifier}
      analytics={analytics}
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
  window.scrollTo = jest.fn()
  mount(getComponent())

  expect((window.scrollTo as jest.Mock).mock.calls.length).toBe(1)
})
