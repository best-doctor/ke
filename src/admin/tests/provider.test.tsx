import { testProvider } from '../../setupTests'

const resourceFilter = {
  filterName: 'id',
  value: '100500',
  filterOperation: 'equals',
}

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

test.each([
  ['https://test.com/test-url/', ['https://test.com/test-url/', []]],
  [
    'https://test.com/test-url?id__equals=100500',
    ['https://test.com/test-url', [{ filterName: 'id', filterOperation: 'equals', value: '100500' }]],
  ],
])('Provider parse url', (url, expectedResult) => {
  const result = testProvider.parseUrl(url)

  expect(result).toEqual(expectedResult)
})

test.each([
  ['https://test.com/test-url/', [], [filterWithOperation], 'https://test.com/test-url/?id__equals=test12345'],
  ['https://test.com/test-url/', [], [defaultFilter], 'https://test.com/test-url/?first_name=Test'],
  [
    'https://test.com/test-url?id__equals=100500',
    [resourceFilter],
    [filterWithOperation],
    'https://test.com/test-url?id__equals=100500',
  ],
])('Provider get url', (resourceUrl, resourceFilters, tableFilterObject, expectedResult) => {
  const result = testProvider.getUrl(resourceUrl, resourceFilters, tableFilterObject)

  expect(result).toBe(expectedResult)
})

test.each([
  [
    { page: 1, per_page: 20, url: 'http://test.com/test-url/?page=1&per_page=20&sum__gte=100500', total: 1 },
    [{ filterName: 'id', filterOperation: 'equals', value: '100500' }],
    [{ id: 'sum', value: { filterName: 'sum', filterOperation: 'gte', value: '100500' } }],
    { page: 1, perPage: 20, nextUrl: undefined, prevUrl: undefined, count: 1 },
  ],
  [
    undefined,
    [{ filterName: 'id', filterOperation: 'equals', value: '100500' }],
    [],
    { page: 1, perPage: 100, count: undefined, nextUrl: undefined, prevUrl: undefined },
  ],
])('Provider get filters and pagination', (meta, resourceFilters, expectedTableFilters, expectedPagination) => {
  const [tableFilters, pagination] = testProvider.getFiltersAndPagination(meta, resourceFilters)

  expect(tableFilters).toEqual(expectedTableFilters)
  expect(pagination).toEqual(expectedPagination)
})

test.each([
  [
    'https://test.com/test-url',
    [{ filterName: 'id', filterOperation: 'gte', value: '100500' }],
    1,
    'https://test.com/test-url?id__gte=100500&page=1',
    [],
  ],
  [
    'https://test.com/test-url?id__gte=100500',
    [{ filterName: 'name', filterOperation: 'icontains', value: 'Test' }],
    1,
    'https://test.com/test-url?name__icontains=Test&id__gte=100500&page=1',
    [{ filterName: 'id', filterOperation: 'gte', value: '100500' }],
  ],
  [
    'https://test.com/test-url?id__gte=100500',
    [{ filterName: 'id', filterOperation: 'gte', value: '100600' }],
    1,
    'https://test.com/test-url?id__gte=100500&page=1',
    [{ filterName: 'id', filterOperation: 'gte', value: '100500' }],
  ],
])('Provider get list', (url, filters, page, expectedUrl, expectedResourceFilters) => {
  testProvider.navigate = jest.fn()

  testProvider.getList(url, filters, page)

  expect(testProvider.navigate).toHaveBeenCalledWith(expectedUrl, expectedResourceFilters)
})

test('Provider get object', () => {
  testProvider.httpClient.get = jest.fn() // eslint-disable-line
  const resourceUrl = 'https://test.com/test-url/'
  const objectId = '100500'

  testProvider.getObject(resourceUrl, objectId)

  expect(testProvider.httpClient.get).toHaveBeenCalledWith('https://test.com/test-url/100500') // eslint-disable-line
})
