import React, { PropsWithChildren } from 'react'
import fc from 'fast-check'
import { render } from '@testing-library/react'
import { renderHook, act } from '@testing-library/react-hooks'

import { SelectViewContainer } from './SelectViewContainer'
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
    fc.property(
      selectParamsArbitrary,
      selectResultArbitrary,
      fc.boolean(),
      fc.lorem(),
      (params, result, isLoading, display) => {
        const { getByText } = render(
          <SelectViewContainer result={result} params={params} isLoading={isLoading} onParamsChange={jest.fn()}>
            {display}
          </SelectViewContainer>
        )

        expect(getByText(display)).toBeInTheDocument()
      }
    )
  )
})

test('useSelectParams got correct value', () => {
  fc.assert(
    fc.property(selectParamsArbitrary, selectResultArbitrary, fc.boolean(), (params, resultData, isLoading) => {
      const handleParamsChangeSpy = jest.fn()
      const wrapper = ({ children }: PropsWithChildren<{}>): JSX.Element => (
        <SelectViewContainer
          result={resultData}
          params={params}
          isLoading={isLoading}
          onParamsChange={handleParamsChangeSpy}
        >
          {children}
        </SelectViewContainer>
      )

      const { result } = renderHook(() => useSelectParams(), { wrapper })

      expect(result.current).toEqual([params, handleParamsChangeSpy])
    })
  )
})

test('useSelectResult got correct value', () => {
  fc.assert(
    fc.property(selectParamsArbitrary, selectResultArbitrary, fc.boolean(), (params, resultData, isLoading) => {
      const wrapper = ({ children }: PropsWithChildren<{}>): JSX.Element => (
        <SelectViewContainer result={resultData} params={params} isLoading={isLoading} onParamsChange={jest.fn()}>
          {children}
        </SelectViewContainer>
      )

      const { result } = renderHook(() => useSelectResult(), { wrapper })

      expect(result.current).toEqual({ result: resultData, status: { isLoading } })
    })
  )
})

test('useSelectOrder got correct value', () => {
  fc.assert(
    fc.property(selectParamsArbitrary, selectResultArbitrary, fc.boolean(), (params, resultData, isLoading) => {
      const wrapper = ({ children }: PropsWithChildren<{}>): JSX.Element => (
        <SelectViewContainer result={resultData} params={params} isLoading={isLoading} onParamsChange={jest.fn()}>
          {children}
        </SelectViewContainer>
      )

      const { result } = renderHook(() => useSelectOrder(), { wrapper })

      expect(result.current[0]).toBe(params.orderBy)
    })
  )
})

test('useSelectOrder got correct callback', () => {
  fc.assert(
    fc.property(
      selectParamsArbitrary,
      selectResultArbitrary,
      fc.boolean(),
      orderByArbitrary,
      (params, resultData, isLoading, changedOrder) => {
        const handleParamsChangeSpy = jest.fn()
        const wrapper = ({ children }: PropsWithChildren<{}>): JSX.Element => (
          <SelectViewContainer
            result={resultData}
            params={params}
            isLoading={isLoading}
            onParamsChange={handleParamsChangeSpy}
          >
            {children}
          </SelectViewContainer>
        )
        const { result } = renderHook(() => useSelectOrder(), { wrapper })

        act(() => result.current[1](changedOrder))

        expect(handleParamsChangeSpy).toBeCalledTimes(1)
        expect(handleParamsChangeSpy).toHaveBeenCalledWith({ ...params, orderBy: changedOrder })
      }
    )
  )
})

test('useSelectFilters got correct value', () => {
  fc.assert(
    fc.property(selectParamsArbitrary, selectResultArbitrary, fc.boolean(), (params, resultData, isLoading) => {
      const wrapper = ({ children }: PropsWithChildren<{}>): JSX.Element => (
        <SelectViewContainer result={resultData} params={params} isLoading={isLoading} onParamsChange={jest.fn()}>
          {children}
        </SelectViewContainer>
      )

      const { result } = renderHook(() => useSelectFilters(), { wrapper })

      expect(result.current[0]).toBe(params.filters)
    })
  )
})

test('useSelectFilters got correct callback', () => {
  fc.assert(
    fc.property(
      selectParamsArbitrary,
      selectResultArbitrary,
      fc.boolean(),
      filtersArbitrary,
      (params, resultData, isLoading, changedFilters) => {
        const handleParamsChangeSpy = jest.fn()
        const wrapper = ({ children }: PropsWithChildren<{}>): JSX.Element => (
          <SelectViewContainer
            result={resultData}
            params={params}
            isLoading={isLoading}
            onParamsChange={handleParamsChangeSpy}
          >
            {children}
          </SelectViewContainer>
        )
        const { result } = renderHook(() => useSelectFilters(), { wrapper })

        act(() => result.current[1](changedFilters))

        expect(handleParamsChangeSpy).toBeCalledTimes(1)
        expect(handleParamsChangeSpy).toHaveBeenCalledWith({ ...params, filters: changedFilters })
      }
    )
  )
})

test('useSelectPagination got correct value', () => {
  fc.assert(
    fc.property(selectParamsArbitrary, selectResultArbitrary, fc.boolean(), (params, resultData, isLoading) => {
      const wrapper = ({ children }: PropsWithChildren<{}>): JSX.Element => (
        <SelectViewContainer result={resultData} params={params} isLoading={isLoading} onParamsChange={jest.fn()}>
          {children}
        </SelectViewContainer>
      )

      const { result } = renderHook(() => useSelectPagination(), { wrapper })

      expect(result.current[0]).toBe(params.pagination)
    })
  )
})

test('useSelectPagination got correct callback', () => {
  fc.assert(
    fc.property(
      selectParamsArbitrary,
      selectResultArbitrary,
      fc.boolean(),
      paginationArbitrary,
      (params, resultData, isLoading, changedPagination) => {
        const handleParamsChangeSpy = jest.fn()
        const wrapper = ({ children }: PropsWithChildren<{}>): JSX.Element => (
          <SelectViewContainer
            result={resultData}
            params={params}
            isLoading={isLoading}
            onParamsChange={handleParamsChangeSpy}
          >
            {children}
          </SelectViewContainer>
        )
        const { result } = renderHook(() => useSelectPagination(), { wrapper })

        act(() => result.current[1](changedPagination))

        expect(handleParamsChangeSpy).toBeCalledTimes(1)
        expect(handleParamsChangeSpy).toHaveBeenCalledWith({ ...params, pagination: changedPagination })
      }
    )
  )
})
