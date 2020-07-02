import { testProvider } from '../../setupTests'

import type { Filter } from '../providers/index'

const filterWithOperation = {
  filterName: 'id',
  value: 'test12345',
  filterOperation: 'equals',
}

const defaultFilter = {
  filterName: 'first_name',
  value: 'Test',
  filterOperation: undefined,
}

test('Provider get filter query with filter operation', () => {
  const expectedResult = ['id__equals', 'test12345']

  const result = testProvider.getFilterQuery(filterWithOperation)

  expect(result).toEqual(expectedResult)
})

test('Provder get filter query without filter operation', () => {
  const expectedResult = ['first_name', 'Test']

  const result = testProvider.getFilterQuery(defaultFilter)

  expect(result).toEqual(expectedResult)
})

test.each([
  [[filterWithOperation], 'https://test.com/test-url/?id__equals=test12345'],
  [[defaultFilter], 'https://test.com/test-url/?first_name=Test'],
])('Provider get url', (tableFilterObject, expectedResult) => {
  const resourceUrl = 'https://test.com/test-url/'
  const resourceFilters: Filter[] = []
  const result = testProvider.getUrl(resourceUrl, resourceFilters, tableFilterObject)

  expect(result).toBe(expectedResult)
})
