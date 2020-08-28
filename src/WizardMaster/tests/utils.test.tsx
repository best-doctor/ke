import { testWizard } from '../../setupTests'

import { getWizardFromCallable } from '../utils'

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
