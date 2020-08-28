import { mocked } from 'ts-jest/utils'

import { mountDetailFields } from '../mountDetailFields'
import { mountComponents } from '../../common/utils/mountComponents'
import { initDetailViewControllers } from '../controllers'

import { testAdmin, testProvider, testNotifier } from '../../setupTests'

jest.mock('../../common/utils/mountComponents')
jest.mock('../controllers')

const mockedMountComponents = mocked(mountComponents)
const initDetailViewControllersMock = mocked(initDetailViewControllers).mockImplementation(() => [jest.fn(), jest.fn()])

test('Call mount componentns for unpack detail view widgets with correct args', () => {
  const setObject = jest.fn()
  const resourceName = 'test'
  const object = {}
  const elements = testAdmin.detail_fields
  const provider = testProvider
  const notifier = testNotifier
  const user = {}
  const analytics = undefined
  const ViewType = 'test'

  mountDetailFields({
    resourceName,
    object,
    elements,
    provider,
    setObject,
    notifier,
    user,
    analytics,
    ViewType,
  })

  expect(mockedMountComponents.mock.calls.length).toBe(1)
  expect(initDetailViewControllersMock.mock.calls.length).toBe(1)
  expect(initDetailViewControllersMock).toHaveBeenCalledWith(testProvider, setObject, testNotifier)
})
