import { testWizard, testNotifier, testProvider } from '../../setupTests'

import { mountWizards } from '../mountWizards'

test('Mount wizard main component', () => {
  const resourceName = 'test'
  const ViewType = 'test_view'
  const elements = [testWizard]
  const elementsKey = 'wizards'
  const provider = testProvider
  const setMainDetailObject = jest.fn()
  const refreshMainDetailObject = jest.fn()
  const analytics = undefined
  const user = {}

  const element = mountWizards({
    resourceName,
    notifier: testNotifier,
    ViewType,
    elements,
    elementsKey,
    provider,
    setMainDetailObject,
    refreshMainDetailObject,
    analytics,
    user,
    mainDetailObject: { id: 100500 },
    activeWizardRef: { current: null },
  })
  const result = element.props.children[0]

  expect(result.key).toEqual('Test Wizard')
  expect(result.props.ViewType).toEqual('test_view')
})
