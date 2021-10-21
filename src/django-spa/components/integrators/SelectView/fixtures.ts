import fc, { Arbitrary } from 'fast-check'

export const selectResultArbitrary = fc.record({
  items: fc.array(fc.anything()),
  total: fc.nat(),
})

export const orderByArbitrary = fc.dictionary(
  fc.string(),
  fc.constantFrom('asc', 'desc', null) as Arbitrary<'asc' | 'desc' | null>
)

export const filtersArbitrary = fc.dictionary(fc.string(), fc.anything())

export const paginationArbitrary = fc.record({
  page: fc.nat(),
  perPage: fc.integer(1, 2147483647),
})

export const selectParamsArbitrary = fc.record({
  filters: filtersArbitrary,
  orderBy: orderByArbitrary,
  pagination: paginationArbitrary,
})