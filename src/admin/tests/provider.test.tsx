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
  ['https://test.com/test-url/', [], [filterWithOperation], {}, 'https://test.com/test-url/?id__equals=test12345'],
  ['https://test.com/test-url/', [], [defaultFilter], {}, 'https://test.com/test-url/?first_name=Test'],
  [
    'https://test.com/test-url?id__equals=100500',
    [resourceFilter],
    [filterWithOperation],
    {},
    'https://test.com/test-url?id__equals=100500',
  ],
  ['https://test.com/test-url/', [], [], { page: 1 }, 'https://test.com/test-url/?page=1'],
  ['https://test.com/test-url/', [], [], { before: null }, 'https://test.com/test-url/?before='],
  ['https://test.com/test-url/', [], [], { after: null }, 'https://test.com/test-url/?after='],
])('Provider get url', (resourceUrl, resourceFilters, tableFilterObject, paginationParameters, expectedResult) => {
  const result = testProvider.getUrl(resourceUrl, resourceFilters, tableFilterObject, paginationParameters)

  expect(result).toBe(expectedResult)
})

test.each([
  [
    {
      page: 1,
      per_page: 20,
      url: 'http://test.com/test-url/?page=1&per_page=20&sum__gte=100500&before=true&after=true',
      total: 1,
    },
    [{ filterName: 'id', filterOperation: 'equals', value: '100500' }],
    [{ id: 'sum', value: { filterName: 'sum', filterOperation: 'gte', value: '100500' } }],
  ],
  [undefined, [{ filterName: 'id', filterOperation: 'equals', value: '100500' }], []],
])('Provider get filters', (meta, resourceFilters, expectedTableFilters) => {
  const tableFilters = testProvider.getFilters(meta, resourceFilters)

  expect(tableFilters).toEqual(expectedTableFilters)
})

test.each([
  [
    { page: 1, per_page: 20, url: 'http://test.com/test-url/?page=1&per_page=20&sum__gte=100500', total: 1 },
    { page: 1, perPage: 20, nextUrl: undefined, prevUrl: undefined, count: 1 },
  ],
  [
    {
      per_page: 20,
      url: 'http://test.com/test-url/?per_page=20&sum__gte=100500&before=true',
      total: 1,
      before: null,
      has_next: true,
    },
    { before: null, after: undefined, perPage: 20, nextUrl: undefined, prevUrl: undefined, count: 1 },
  ],
  [
    {
      per_page: 20,
      url: 'http://test.com/test-url/?per_page=20&sum__gte=100500&after=true',
      total: 1,
      after: null,
      has_next: true,
    },
    { before: undefined, after: null, perPage: 20, nextUrl: undefined, prevUrl: undefined, count: 1 },
  ],
  [
    { per_page: 20, url: 'http://test.com/test-url/?per_page=20&sum__gte=100500', total: 1 },
    { page: 1, perPage: 100, nextUrl: undefined, prevUrl: undefined, count: undefined },
  ],
  [undefined, { page: 1, perPage: 100, count: undefined, nextUrl: undefined, prevUrl: undefined }],
])('Provider get pagination', (meta, expectedPagination) => {
  const pagination = testProvider.getPagination(meta)

  expect(pagination).toMatchObject(expectedPagination)
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

  testProvider.getPage(url, filters, { page })

  expect(testProvider.navigate).toHaveBeenCalledWith(expectedUrl, expectedResourceFilters, undefined, undefined)
})

test('Provider get object', () => {
  testProvider.httpClient.get = jest.fn() // eslint-disable-line
  const resourceUrl = 'https://test.com/test-url/100500/'

  testProvider.getObject(resourceUrl).then(
    () => {},
    () => {}
  )

  expect(testProvider.httpClient.get).toHaveBeenCalledWith('https://test.com/test-url/100500/')
})
