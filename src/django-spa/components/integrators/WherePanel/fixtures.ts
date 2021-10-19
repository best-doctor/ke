import { fc } from 'jest-fast-check'

export const filtersArbitrary = fc.dictionary(fc.string(), fc.anything())

export const handleFiltersArbitrary = fc.func(fc.constant(undefined))
