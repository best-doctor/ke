import React from 'react'
import { mount } from 'enzyme'
import { ChakraProvider } from '@chakra-ui/react'

import { WizardStepControlPanel } from '../../components/WizardStepContainer/WizardStepControlPanel'
import { testWizard, testProvider, testWizardStep, testNotifier, waitForComponentToPaint } from '../../../setupTests'

beforeEach(() => {
  window.scrollTo = jest.fn()
})

afterEach(() => {
  jest.clearAllMocks()
})

jest.mock('../../../integration/analytics/utils')

const getComponent = (): JSX.Element => {
  const currentState = 'begin'
  const analytics = undefined

  return (
    <ChakraProvider>
      <WizardStepControlPanel
        wizardStep={testWizardStep}
        wizard={testWizard}
        provider={testProvider}
        mainWizardObject={{ id: 100500 }}
        analytics={analytics}
        submitChange={jest.fn()}
        currentState={currentState}
        setCurrentState={jest.fn()}
        refreshMainDetailObject={jest.fn()}
        setMainDetailObject={jest.fn()}
        notifier={testNotifier}
      />
    </ChakraProvider>
  )
}

test('Wizard step control panel buttons', () => {
  const component = mount(getComponent())

  waitForComponentToPaint(component)
  const buttons = component.find('button')

  expect(buttons.length).toBe(2)
})
