import React, { PropsWithChildren } from 'react'
import fc, { Arbitrary } from 'fast-check'
import { act, renderHook } from '@testing-library/react-hooks'

import { SelectParamsProvider, useSelectOrder, useSelectFilters, useSelectPagination, useSelectParams } from './Params'
import { Updatable, SelectParams } from './types'

const filtersArbitrary = fc.dictionary(fc.string(), fc.anything())

const orderArbitrary = fc.dictionary(
  fc.string(),
  fc.constantFrom('asc', 'desc', null) as Arbitrary<'asc' | 'desc' | null>
)

const paginationArbitrary = fc.record({
  page: fc.nat(),
  perPage: fc.nat(),
})

const paramsArbitrary = fc.record({
  filters: filtersArbitrary,
  orderBy: orderArbitrary,
  pagination: paginationArbitrary,
})

describe.each([
  ['useSelectFilters', useSelectFilters, 'filters', filtersArbitrary],
  ['useSelectOrder', useSelectOrder, 'orderBy', orderArbitrary],
  ['useSelectPagination', useSelectPagination, 'pagination', paginationArbitrary],
] as TestTuple<unknown>[])('%s', (_, hook, paramsKey, valueArbitrary) => {
  it('Get valid value from context', () => {
    fc.assert(
      fc.property(paramsArbitrary, (params) => {
        const wrapper = ({ children }: PropsWithChildren<{}>): JSX.Element => (
          <SelectParamsProvider value={params} onChange={jest.fn()}>
            {children}
          </SelectParamsProvider>
        )

        const { result } = renderHook(() => hook(), { wrapper })

        expect(result.current[0]).toBe(params[paramsKey])
      })
    )
  })

  it('Get correct updater from context', () => {
    fc.assert(
      fc.property(paramsArbitrary, valueArbitrary, (params, changed) => {
        const handleChangeSpy = jest.fn<void, [unknown]>()
        const wrapper = ({ children }: PropsWithChildren<{}>): JSX.Element => (
          <SelectParamsProvider value={params} onChange={handleChangeSpy}>
            {children}
          </SelectParamsProvider>
        )

        const { result } = renderHook(() => hook(), { wrapper })
        act(() => {
          result.current[1](changed)
        })

        expect(handleChangeSpy).toBeCalledTimes(1)
        expect(handleChangeSpy.mock.calls[0][0]).toEqual({ ...params, [paramsKey]: changed })
      })
    )
  })
})

describe('useSelectParams', () => {
  it('Get valid value from context', () => {
    fc.assert(
      fc.property(paramsArbitrary, (params) => {
        const wrapper = ({ children }: PropsWithChildren<{}>): JSX.Element => (
          <SelectParamsProvider value={params} onChange={jest.fn()}>
            {children}
          </SelectParamsProvider>
        )

        const { result } = renderHook(() => useSelectParams(), { wrapper })

        expect(result.current[0]).toBe(params)
      })
    )
  })

  it('Get correct updater from context', () => {
    fc.assert(
      fc.property(paramsArbitrary, paramsArbitrary, (params, changed) => {
        const handleChangeSpy = jest.fn()
        const wrapper = ({ children }: PropsWithChildren<{}>): JSX.Element => (
          <SelectParamsProvider value={params} onChange={handleChangeSpy}>
            {children}
          </SelectParamsProvider>
        )

        const { result } = renderHook(() => useSelectParams(), { wrapper })
        act(() => {
          result.current[1](changed)
        })

        expect(handleChangeSpy).toBeCalledTimes(1)
        expect(handleChangeSpy).toHaveBeenCalledWith(changed)
      })
    )
  })
})

type TestTuple<T> = [hookName: string, hook: () => Updatable<T>, paramsKey: keyof SelectParams, arbitrary: Arbitrary<T>]
