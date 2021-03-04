import { makeUpdateWithNotification, setPaginationParameters } from '../providers/utils'

import { testProvider, dataMockResponse, testNotifier } from '../../setupTests'

test('Update object with notification', () => {
  const spy = jest.spyOn(testProvider, 'patch').mockImplementation(() => {
    return Promise.resolve(dataMockResponse[0])
  })

  makeUpdateWithNotification(testProvider, 'https://test.com', {}, jest.fn(), testNotifier)

  expect(spy).toHaveBeenCalledTimes(1)
})

test.each([
  [{ page: 1 }, 'page', '1'],
  [{ before: null }, 'before', ''],
  [{ after: null }, 'after', ''],
  [{ before: '0d6fae07-af1f-46cd-92d3-e2164abe4d8a' }, 'before', '0d6fae07-af1f-46cd-92d3-e2164abe4d8a'],
  [{ after: '0ac2ead6-d498-4fec-9d30-025bba7eab99' }, 'after', '0ac2ead6-d498-4fec-9d30-025bba7eab99'],
  [{ after: undefined }, 'after', null],
])('Set Pagination Parameters', (parameters, searchParameter, expectedSearchValue) => {
  const url = new URL('https://test.com')

  setPaginationParameters(url, parameters)
  const searchParameterValue = url.searchParams.get(searchParameter)

  expect(searchParameterValue).toEqual(expectedSearchValue)
})
