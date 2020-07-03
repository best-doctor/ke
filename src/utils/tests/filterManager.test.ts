import { FilterManager } from '../filterManager'

const queryString = 'id=100500&status=new&date__gte=10-03-2020'

test('Get url search params object from query string', () => {
  const result = FilterManager.getUrlSearchParamsObject(queryString)

  expect(result.get('status')).toEqual('new')
  expect(result.get('id')).toEqual('100500')
  expect(result.get('date__gte')).toEqual('10-03-2020')
})

test('Convert query string to js object', () => {
  const result = FilterManager.convertQueryStringToObject(queryString)

  expect(result).toEqual({ status: 'new', id: '100500', date__gte: '10-03-2020' })
})

test.each([
  [
    [
      { filterName: 'status', filterOperation: undefined, value: 'new' },
      { filterName: 'status', filterOperation: undefined, value: 'closed' },
    ],
    [{ filterName: 'status', filterOperation: undefined, value: 'new' }],
  ],
])('Remove duplicates from object by unique key', (filters, expectedResult) => {
  const result = FilterManager.removeDuplicates(filters)

  expect(result).toEqual(expectedResult)
})

test('Get filter object from query string', () => {
  const expectedResult = [
    { filterName: 'id', filterOperation: undefined, value: '100500' },
    { filterName: 'status', filterOperation: undefined, value: 'new' },
    { filterName: 'date', filterOperation: 'gte', value: '10-03-2020' },
  ]

  const result = FilterManager.getQueryFilters(queryString)

  expect(result).toEqual(expectedResult)
})
