import { mocked } from 'ts-jest/utils'

import { initDataUpdateHandler, initDetailViewControllers } from '../controllers'
import { submitChange, setInitialValue } from '../events'
import { makeUpdateWithNotification } from '../../admin/providers/utils'
import { testProvider, testNotifier } from '../../setupTests'
import { containerStore } from '../store'

jest.mock('../../admin/providers/utils')
const makeUpdateWithNotificationMock = mocked(makeUpdateWithNotification)

const setObject = jest.fn()

test('Initialization of data update handlers', () => {
  initDataUpdateHandler(testProvider, setObject, testNotifier)

  submitChange({ url: 'https://test.com', payload: { test: 'test' } })

  expect(makeUpdateWithNotificationMock.mock.calls.length).toBe(1)
})

test('Detail view controllers initialization', () => {
  initDetailViewControllers(testProvider, setObject, testNotifier)

  setInitialValue({ test: 'test' })

  expect((containerStore.getState() as { test: string }).test).toBe('test')
})
