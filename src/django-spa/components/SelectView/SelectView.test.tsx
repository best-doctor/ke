import React, { PropsWithChildren } from 'react'
import { fc, testProp } from 'jest-fast-check'
import { render, cleanup } from '@testing-library/react'
import { renderHook, act } from '@testing-library/react-hooks'

import { SelectView } from './SelectView'
import { useSelectParams, useSelectResult, useSelectOrder, useSelectFilters, useSelectPagination } from './Contexts'

import {
  filtersArbitrary,
  orderByArbitrary,
  paginationArbitrary,
  selectParamsArbitrary,
  selectResultArbitrary,
} from './fixtures'

test('Render children', () => {
  fc.assert(
    fc
      .property(
        selectParamsArbitrary,
        selectResultArbitrary,
        fc.boolean(),
        fc.lorem(),
        (params, result, isLoading, display) => {
          const { getByText } = render(
            <SelectView result={result} params={params} isLoading={isLoading} onParamsChange={jest.fn()}>
              {display}
            </SelectView>
          )

          expect(getByText(display)).toBeInTheDocument()
        }
      )
      .afterEach(cleanup)
  )
})

testProp(
  'useSelectParams got correct value',
  [selectParamsArbitrary, selectResultArbitrary, fc.boolean()],
  (params, resultData, isLoading) => {
    const handleParamsChangeSpy = jest.fn()
    const wrapper = ({ children }: PropsWithChildren<{}>): JSX.Element => (
      <SelectView result={resultData} params={params} isLoading={isLoading} onParamsChange={handleParamsChangeSpy}>
        {children}
      </SelectView>
    )

    const { result } = renderHook(() => useSelectParams(), { wrapper })

    expect(result.current).toEqual([params, handleParamsChangeSpy])
  }
)

testProp(
  'useSelectResult got correct value',
  [selectParamsArbitrary, selectResultArbitrary, fc.boolean()],
  (params, resultData, isLoading) => {
    const wrapper = ({ children }: PropsWithChildren<{}>): JSX.Element => (
      <SelectView result={resultData} params={params} isLoading={isLoading} onParamsChange={jest.fn()}>
        {children}
      </SelectView>
    )

    const { result } = renderHook(() => useSelectResult(), { wrapper })

    expect(result.current).toEqual({ result: resultData, status: { isLoading } })
  }
)

testProp(
  'useSelectOrder got correct value',
  [selectParamsArbitrary, selectResultArbitrary, fc.boolean()],
  (params, resultData, isLoading) => {
    const wrapper = ({ children }: PropsWithChildren<{}>): JSX.Element => (
      <SelectView result={resultData} params={params} isLoading={isLoading} onParamsChange={jest.fn()}>
        {children}
      </SelectView>
    )

    const { result } = renderHook(() => useSelectOrder(), { wrapper })

    expect(result.current[0]).toBe(params.orderBy)
  }
)

testProp(
  'useSelectOrder got correct callback',
  [selectParamsArbitrary, selectResultArbitrary, fc.boolean(), orderByArbitrary],
  (params, resultData, isLoading, changedOrder) => {
    const handleParamsChangeSpy = jest.fn()
    const wrapper = ({ children }: PropsWithChildren<{}>): JSX.Element => (
      <SelectView result={resultData} params={params} isLoading={isLoading} onParamsChange={handleParamsChangeSpy}>
        {children}
      </SelectView>
    )
    const { result } = renderHook(() => useSelectOrder(), { wrapper })

    act(() => result.current[1](changedOrder))

    expect(handleParamsChangeSpy).toBeCalledTimes(1)
    expect(handleParamsChangeSpy).toHaveBeenCalledWith({ ...params, orderBy: changedOrder })
  }
)

testProp(
  'useSelectFilters got correct value',
  [selectParamsArbitrary, selectResultArbitrary, fc.boolean()],
  (params, resultData, isLoading) => {
    const wrapper = ({ children }: PropsWithChildren<{}>): JSX.Element => (
      <SelectView result={resultData} params={params} isLoading={isLoading} onParamsChange={jest.fn()}>
        {children}
      </SelectView>
    )

    const { result } = renderHook(() => useSelectFilters(), { wrapper })

    expect(result.current[0]).toBe(params.filters)
  }
)

testProp(
  'useSelectFilters got correct callback',
  [selectParamsArbitrary, selectResultArbitrary, fc.boolean(), filtersArbitrary],
  (params, resultData, isLoading, changedFilters) => {
    const handleParamsChangeSpy = jest.fn()
    const wrapper = ({ children }: PropsWithChildren<{}>): JSX.Element => (
      <SelectView result={resultData} params={params} isLoading={isLoading} onParamsChange={handleParamsChangeSpy}>
        {children}
      </SelectView>
    )
    const { result } = renderHook(() => useSelectFilters(), { wrapper })

    act(() => result.current[1](changedFilters))

    expect(handleParamsChangeSpy).toBeCalledTimes(1)
    expect(handleParamsChangeSpy).toHaveBeenCalledWith({ ...params, filters: changedFilters })
  }
)

testProp(
  'useSelectPagination got correct value',
  [selectParamsArbitrary, selectResultArbitrary, fc.boolean()],
  (params, resultData, isLoading) => {
    const wrapper = ({ children }: PropsWithChildren<{}>): JSX.Element => (
      <SelectView result={resultData} params={params} isLoading={isLoading} onParamsChange={jest.fn()}>
        {children}
      </SelectView>
    )

    const { result } = renderHook(() => useSelectPagination(), { wrapper })

    expect(result.current[0]).toBe(params.pagination)
  }
)

testProp(
  'useSelectPagination got correct callback',
  [selectParamsArbitrary, selectResultArbitrary, fc.boolean(), paginationArbitrary],
  (params, resultData, isLoading, changedPagination) => {
    const handleParamsChangeSpy = jest.fn()
    const wrapper = ({ children }: PropsWithChildren<{}>): JSX.Element => (
      <SelectView result={resultData} params={params} isLoading={isLoading} onParamsChange={handleParamsChangeSpy}>
        {children}
      </SelectView>
    )
    const { result } = renderHook(() => useSelectPagination(), { wrapper })

    act(() => result.current[1](changedPagination))

    expect(handleParamsChangeSpy).toBeCalledTimes(1)
    expect(handleParamsChangeSpy).toHaveBeenCalledWith({ ...params, pagination: changedPagination })
  }
)
