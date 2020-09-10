import { testWizard, testNotifier, testProvider } from '../../setupTests'

import { mountWizards } from '../mountWizards'

test('Mount wizard main component', () => {
  const resourceName = 'test'
  const ViewType = 'test_view'
  const elements = [testWizard]
  const provider = testProvider
  const setObject = jest.fn()
  const analytics = undefined
  const user = {}

  const wizards = mountWizards({
    resourceName,
    notifier: testNotifier,
    ViewType,
    elements,
    provider,
    setObject,
    analytics,
    user,
    object: { id: 100500 },
  })
  const result = wizards[0]

  expect(result.key).toEqual('wizard-element')
  expect(result.props.ViewType).toEqual('test_view')
})