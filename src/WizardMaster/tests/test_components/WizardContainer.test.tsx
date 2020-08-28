import * as React from 'react'
import { mount } from 'enzyme'
import { ThemeProvider } from '@chakra-ui/core'

import { WizardContainer } from '../../components/WizardContainer'
import { testWizard, testProvider, testNotifier } from '../../../setupTests'

const getComponent = (): JSX.Element => {
  const ViewType = 'test_view'
  const setObject = jest.fn()
  const analytics = undefined
  const user = {}

  return (
    <ThemeProvider>
      <WizardContainer
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
      />
    </ThemeProvider>
  )
}

test('Wizard container properly mounts children', () => {
  const component = mount(getComponent())

  expect(component.find('Heading').length).toBe(1)
  expect(component.find('WizardStepComponents').length).toBe(1)
  expect(component.find('WizardValidationErrors').length).toBe(1)
  expect(component.find('WizardStepControlPanel').length).toBe(1)
})
