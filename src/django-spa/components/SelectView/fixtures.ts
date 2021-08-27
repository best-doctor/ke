import fc, { Arbitrary } from 'fast-check'

export const selectResultArbitrary = fc.record({
  items: fc.array(fc.anything()),
  total: fc.nat(),
})

export const orderByArbitrary = fc.dictionary(
  fc.string(),
  fc.constantFrom('asc', 'desc', null) as Arbitrary<'asc' | 'desc' | null>
)

export const selectParamsArbitrary = fc.record({
  filters: fc.dictionary(fc.string(), fc.anything()),
  orderBy: orderByArbitrary,
  pagination: fc.record({
    page: fc.nat(),
  }),
})
