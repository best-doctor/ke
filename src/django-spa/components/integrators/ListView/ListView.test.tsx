import React, { PropsWithChildren } from 'react'
import { fc, testProp } from 'jest-fast-check'
import { render, cleanup } from '@testing-library/react'
import { renderHook, act } from '@testing-library/react-hooks'

import { ListView } from './ListView'
import { useListParams, useListData, useListOrder, useListFilters, useListPagination } from './Contexts'

import {
  filtersArbitrary,
  orderByArbitrary,
  paginationArbitrary,
  listParamsArbitrary,
  listDataArbitrary,
} from './fixtures'

test('Render children', () => {
  fc.assert(
    fc
      .property(
        listParamsArbitrary,
        listDataArbitrary,
        fc.boolean(),
        fc.lorem(),
        (params, data, isLoading, display) => {
          const { getByText } = render(
            <ListView data={data} params={params} isLoading={isLoading} onParamsChange={jest.fn()}>
              {display}
            </ListView>
          )

          expect(getByText(display)).toBeInTheDocument()
        }
      )
      .afterEach(cleanup)
  )
})

testProp(
  'useListParams got correct value',
  [listParamsArbitrary, listDataArbitrary, fc.boolean()],
  (params, data, isLoading) => {
    const handleParamsChangeSpy = jest.fn()
    const wrapper = ({ children }: PropsWithChildren<{}>): JSX.Element => (
      <ListView data={data} params={params} isLoading={isLoading} onParamsChange={handleParamsChangeSpy}>
        {children}
      </ListView>
    )

    const { result } = renderHook(() => useListParams(), { wrapper })

    expect(result.current).toEqual([params, handleParamsChangeSpy])
  }
)

testProp(
  'useListData got correct value',
  [listParamsArbitrary, listDataArbitrary, fc.boolean()],
  (params, data, isLoading) => {
    const wrapper = ({ children }: PropsWithChildren<{}>): JSX.Element => (
      <ListView data={data} params={params} isLoading={isLoading} onParamsChange={jest.fn()}>
        {children}
      </ListView>
    )

    const { result } = renderHook(() => useListData(), { wrapper })

    expect(result.current).toEqual({ data, status: { isLoading } })
  }
)

testProp(
  'useListOrder got correct value',
  [listParamsArbitrary, listDataArbitrary, fc.boolean()],
  (params, data, isLoading) => {
    const wrapper = ({ children }: PropsWithChildren<{}>): JSX.Element => (
      <ListView data={data} params={params} isLoading={isLoading} onParamsChange={jest.fn()}>
        {children}
      </ListView>
    )

    const { result } = renderHook(() => useListOrder(), { wrapper })

    expect(result.current[0]).toBe(params.orderBy)
  }
)

testProp(
  'useListOrder got correct callback',
  [listParamsArbitrary, listDataArbitrary, fc.boolean(), orderByArbitrary],
  (params, data, isLoading, changedOrder) => {
    const handleParamsChangeSpy = jest.fn()
    const wrapper = ({ children }: PropsWithChildren<{}>): JSX.Element => (
      <ListView data={data} params={params} isLoading={isLoading} onParamsChange={handleParamsChangeSpy}>
        {children}
      </ListView>
    )
    const { result } = renderHook(() => useListOrder(), { wrapper })

    act(() => result.current[1](changedOrder))

    expect(handleParamsChangeSpy).toBeCalledTimes(1)
    expect(handleParamsChangeSpy).toHaveBeenCalledWith({ ...params, orderBy: changedOrder })
  }
)

testProp(
  'useListFilters got correct value',
  [listParamsArbitrary, listDataArbitrary, fc.boolean()],
  (params, data, isLoading) => {
    const wrapper = ({ children }: PropsWithChildren<{}>): JSX.Element => (
      <ListView data={data} params={params} isLoading={isLoading} onParamsChange={jest.fn()}>
        {children}
      </ListView>
    )

    const { result } = renderHook(() => useListFilters(), { wrapper })

    expect(result.current[0]).toBe(params.filters)
  }
)

testProp(
  'useListFilters got correct callback',
  [listParamsArbitrary, listDataArbitrary, fc.boolean(), filtersArbitrary],
  (params, data, isLoading, changedFilters) => {
    const handleParamsChangeSpy = jest.fn()
    const wrapper = ({ children }: PropsWithChildren<{}>): JSX.Element => (
      <ListView data={data} params={params} isLoading={isLoading} onParamsChange={handleParamsChangeSpy}>
        {children}
      </ListView>
    )
    const { result } = renderHook(() => useListFilters(), { wrapper })

    act(() => result.current[1](changedFilters))

    expect(handleParamsChangeSpy).toBeCalledTimes(1)
    expect(handleParamsChangeSpy).toHaveBeenCalledWith({ ...params, filters: changedFilters })
  }
)

testProp(
  'useListPagination got correct value',
  [listParamsArbitrary, listDataArbitrary, fc.boolean()],
  (params, data, isLoading) => {
    const wrapper = ({ children }: PropsWithChildren<{}>): JSX.Element => (
      <ListView data={data} params={params} isLoading={isLoading} onParamsChange={jest.fn()}>
        {children}
      </ListView>
    )

    const { result } = renderHook(() => useListPagination(), { wrapper })

    expect(result.current[0]).toBe(params.pagination)
  }
)

testProp(
  'useListPagination got correct callback',
  [listParamsArbitrary, listDataArbitrary, fc.boolean(), paginationArbitrary],
  (params, data, isLoading, changedPagination) => {
    const handleParamsChangeSpy = jest.fn()
    const wrapper = ({ children }: PropsWithChildren<{}>): JSX.Element => (
      <ListView data={data} params={params} isLoading={isLoading} onParamsChange={handleParamsChangeSpy}>
        {children}
      </ListView>
    )
    const { result } = renderHook(() => useListPagination(), { wrapper })

    act(() => result.current[1](changedPagination))

    expect(handleParamsChangeSpy).toBeCalledTimes(1)
    expect(handleParamsChangeSpy).toHaveBeenCalledWith({ ...params, pagination: changedPagination })
  }
)
