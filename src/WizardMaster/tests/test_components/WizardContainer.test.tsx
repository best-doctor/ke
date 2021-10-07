import React from 'react'
import { mount } from 'enzyme'
import { ChakraProvider } from '@chakra-ui/react'

import { WizardContainer } from '../../components/WizardContainer'
import { testWizard, testProvider, testNotifier } from '../../../setupTests'

const getComponent = (): JSX.Element => {
  const ViewType = 'test_view'
  const setMainDetailObject = jest.fn()
  const refreshMainDetailObject = jest.fn()
  const analytics = undefined
  const user = {}

  return (
    <ChakraProvider>
      <WizardContainer
        wizard={testWizard}
        provider={testProvider}
        mainDetailObject={{ id: 100500 }}
        setMainDetailObject={setMainDetailObject}
        refreshMainDetailObject={refreshMainDetailObject}
        notifier={testNotifier}
        analytics={analytics}
        ViewType={ViewType}
        user={user}
        show
        submitChange={jest.fn()}
      />
    </ChakraProvider>
  )
}

test('Wizard container properly mounts children', () => {
  const component = mount(getComponent())

  expect(component.find('WizardStepComponents').length).toBe(1)
  expect(component.find('WizardValidationErrors').length).toBe(1)
  expect(component.find('WizardStepControlPanel').length).toBe(1)
})

test('Wizard WizardStepControlPanel properly mounts with right test id', () => {
  const component = mount(getComponent())

  expect(component.find('WizardStepControlPanel').prop('data-test-id')).toBe('testWizard-testWizardStep--controlPanel')
})

test('Wizard WizardStepTitle properly mounts with right test id', () => {
  const component = mount(getComponent())

  expect(component.find('h2').prop('data-test-id')).toBe('testWizard-testWizardStep--title')
})
