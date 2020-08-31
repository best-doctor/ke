import { makeUpdateWithNotification } from '../providers/utils'

import { testProvider, dataMockResponse, testNotifier } from '../../setupTests'

test('Update object with notification', () => {
  const spy = jest.spyOn(testProvider, 'patch').mockImplementation(() => {
    return Promise.resolve(dataMockResponse[0])
  })

  makeUpdateWithNotification(testProvider, 'https://test.com', {}, jest.fn(), testNotifier)

  expect(spy).toHaveBeenCalledTimes(1)
})
