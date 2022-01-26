import { fc } from 'jest-fast-check'
import { makeFakeComponent } from '@test-utils/fake-components'

export const dataCtxArbitrary = fc.record({
  items: fc.array(fc.anything()),
  total: fc.nat(),
})

export const statusCtxArbitrary = fc.record({
  isLoading: fc.boolean(),
  isNotLoaded: fc.boolean(),
})

export const paramsArbitrary = fc.record({
  filters: fc.dictionary(fc.string(), fc.anything()),
  order: fc.dictionary(fc.string(), fc.constantFrom('asc' as const, 'desc' as const, null)),
  pagination: fc.record({
    currentPage: fc.nat(),
    itemsPerPage: fc.nat(),
  }),
})

export const selectedArbitrary = fc.array(fc.anything())

export const [TestFilters, testFiltersContent] = makeFakeComponent('TestFilters', ['filters', 'isLoading'])

export const [TestData, testDataContent] = makeFakeComponent('TestData', ['items', 'isLoading'])

export const [TestSelectData, testSelectDataContent] = makeFakeComponent('TestData', ['items', 'isLoading', 'selected'])

export const [TestSelected, testSelectedContent] = makeFakeComponent('TestData', ['selected'])

export const [TestPagination, testPaginationContent] = makeFakeComponent('TestPagination', [
  'currentPage',
  'totalPages',
])
