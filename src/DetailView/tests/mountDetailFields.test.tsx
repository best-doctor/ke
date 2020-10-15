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
  const setMainDetailObject = jest.fn()
  const resourceName = 'test'
  const mainDetailObject = {}
  const elements = testAdmin.detail_fields
  const provider = testProvider
  const notifier = testNotifier
  const user = {}
  const analytics = undefined
  const ViewType = 'test'
  const elementsKey = 'detail_fields'

  mountDetailFields({
    resourceName,
    mainDetailObject,
    elements,
    provider,
    setMainDetailObject,
    notifier,
    user,
    analytics,
    ViewType,
    elementsKey,
  })

  expect(mockedMountComponents.mock.calls.length).toBe(1)
  expect(initDetailViewControllersMock.mock.calls.length).toBe(1)
  expect(initDetailViewControllersMock).toHaveBeenCalledWith(testProvider, setMainDetailObject, testNotifier)
})
