import * as React from 'react'
import { mount } from 'enzyme'
import { ThemeProvider } from '@chakra-ui/core'

import { WizardContainer } from '../../components/WizardContainer'
import { testWizard, testProvider, testNotifier } from '../../../setupTests'

const getComponent = (): JSX.Element => {
  const ViewType = 'test_view'
  const setMainDetailObject = jest.fn()
  const analytics = undefined
  const googleConfig = undefined
  const user = {}

  return (
    <ThemeProvider>
      <WizardContainer
        wizard={testWizard}
        provider={testProvider}
        mainDetailObject={{ id: 100500 }}
        setMainDetailObject={setMainDetailObject}
        notifier={testNotifier}
        analytics={analytics}
        googleConfig={googleConfig}
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
