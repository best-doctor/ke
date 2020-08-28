import { testWizard, testNotifier, testProvider } from '../../setupTests'

import { getWizardFromCallable, mountWizards } from '../utils'

const object = {
  id: 100500,
}

test.each([
  [testWizard, testWizard],
  [(obj: { id: number }) => (obj.id === 100500 ? testWizard : null), testWizard],
  [(obj: { id: number }) => (obj.id === 100600 ? testWizard : null), null],
])('Properly unpack wizard instance', (wizardInstance, expectedResult) => {
  const result = getWizardFromCallable(wizardInstance, object)

  expect(result).toEqual(expectedResult)
})

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
    object,
  })
  const result = wizards[0]

  expect(result.key).toEqual('wizard-element')
  expect(result.props.ViewType).toEqual('test_view')
})
