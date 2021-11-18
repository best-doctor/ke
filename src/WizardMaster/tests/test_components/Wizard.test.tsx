import React from 'react'
import { shallow } from 'enzyme'
import { mocked } from 'ts-jest/utils'

import { Wizard } from '../../components'
import { pushAnalytics } from '../../../integration/analytics/utils'
import { testWizard, testProvider, testNotifier } from '../../../setupTests'

jest.mock('../../utils')
jest.mock('../../../integration/analytics/utils')

const getComponent = (): JSX.Element => {
  const resourceName = 'test'
  const ViewType = 'test_view'
  const setMainDetailObject = jest.fn()
  const refreshMainDetailObject = jest.fn()
  const analytics = undefined
  const user = {}
  const activeWizardRef = { current: null }

  return (
    <Wizard
      resourceName={resourceName}
      wizard={testWizard}
      provider={testProvider}
      mainDetailObject={{ id: 100500 }}
      setMainDetailObject={setMainDetailObject}
      refreshMainDetailObject={refreshMainDetailObject}
      notifier={testNotifier}
      analytics={analytics}
      ViewType={ViewType}
      user={user}
      style={{}}
      activeWizardRef={activeWizardRef}
    />
  )
}

test('Wizard main component elements', () => {
  const component = shallow(getComponent())

  expect(component.find('WizardContainer').length).toBe(1)
  expect(component.find({ 'data-test-id': 'testWizard' }).length).toBe(1)
})

test('Wizard main component push analytics', () => {
  const pushAnalyticsMock = mocked(pushAnalytics)

  const component = shallow(getComponent())
  const wizardButton = component.find('Button')

  ;(wizardButton.props() as { onClick: Function }).onClick()

  expect(pushAnalyticsMock.mock.calls.length).toBe(1)
})
