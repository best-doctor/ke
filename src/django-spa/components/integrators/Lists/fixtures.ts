import { fc } from 'jest-fast-check'

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
