import { LocalCache } from '../providers/caches'

test.each([
  [undefined, undefined, undefined],
  [undefined, 0, undefined],
  [undefined, 60, 'value'],
  [0, undefined, undefined],
  [0, 0, undefined],
  [0, 60, 'value'],
  [60, undefined, 'value'],
  [60, 0, undefined],
  [60, 60, 'value'],
])('Local cache set and get', (initialCacheTime, cacheTime, expectedResult) => {
  const cache = new LocalCache(initialCacheTime)

  cache.set('key', 'value')

  const result = cache.get('key', cacheTime)

  expect(result).toEqual(expectedResult)
})
