import * as React from 'react'
import { shallow } from 'enzyme'
import { mocked } from 'ts-jest/utils'

import { Wizard } from '../../components'
import { pushAnalytics } from '../../../integration/analytics/utils'
import { clearInitialObjectState } from '../../utils'
import { testWizard, testProvider, testNotifier } from '../../../setupTests'

jest.mock('../../utils')
jest.mock('../../../integration/analytics/utils')

const getComponent = (): JSX.Element => {
  const resourceName = 'test'
  const ViewType = 'test_view'
  const setObject = jest.fn()
  const analytics = undefined
  const user = {}

  return (
    <Wizard
      resourceName={resourceName}
      wizard={testWizard}
      provider={testProvider}
      object={{ id: 100500 }}
      setObject={setObject}
      notifier={testNotifier}
      analytics={analytics}
      ViewType={ViewType}
      user={user}
      style={{}}
    />
  )
}

test('Wizard main component elements', () => {
  const component = shallow(getComponent())

  expect(component.find('WizardContainer').length).toBe(1)
})

test('Wizard storage clear after mounting', () => {
  const clearStorageMock = mocked(clearInitialObjectState)

  shallow(getComponent())

  expect(clearStorageMock.mock.calls.length).toBe(2)
})

test('Wizard main component push analytics', () => {
  const pushAnalyticsMock = mocked(pushAnalytics)

  const component = shallow(getComponent())
  const wizardButton = component.find('Button')

  ;(wizardButton.props() as { onClick: Function }).onClick()

  expect(pushAnalyticsMock.mock.calls.length).toBe(1)
})
