import React from 'react'
import { mount } from 'enzyme'
import { ChakraProvider } from '@chakra-ui/react'
import { mocked } from 'ts-jest/utils'

import { pushAnalytics } from '../../../integration/analytics/utils'
import { WizardStepControlPanel } from '../../components/WizardStepContainer/WizardStepControlPanel'
import { testWizard, testProvider, testWizardStep, testNotifier, waitForComponentToPaint } from '../../../setupTests'

beforeEach(() => {
  window.scrollTo = jest.fn()
})

afterEach(() => {
  jest.clearAllMocks()
})

jest.mock('../../../integration/analytics/utils')

const pushAnalyticsMock = mocked(pushAnalytics)

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

test.each([[0], [1]])('Wizard step control panel buttons analytics', (buttonIndex) => {
  const component = mount(getComponent())
  waitForComponentToPaint(component)
  const buttons = component.find('button')

  const prevButton = buttons.get(buttonIndex)
  prevButton.props.onClick()

  expect(pushAnalyticsMock.mock.calls.length).toBe(1)
})
