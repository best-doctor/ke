import React from 'react'
import fc from 'fast-check'
import { render, act } from '@testing-library/react'
import { omit } from '@utils/Dicts'

import { SelectContainer } from './SelectContainer'
import { SelectOrderedData } from './SelectOrderedData'

import { selectParamsArbitrary, selectResultArbitrary, orderByArbitrary } from './fixtures'

test('Use component from `as`-props', () => {
  fc.assert(
    fc.property(selectParamsArbitrary, selectResultArbitrary, fc.boolean(), (params, result, isLoading) => {
      const orderDataSpy = jest.fn().mockReturnValue('ordered data')

      render(
        <SelectContainer result={result} params={params} isLoading={isLoading} onParamsChange={jest.fn()}>
          <SelectOrderedData as={orderDataSpy} />
        </SelectContainer>
      )

      expect(orderDataSpy).toBeCalledTimes(1)
    })
  )
})

test('Pass correct props to ordered data component', () => {
  fc.assert(
    fc.property(selectParamsArbitrary, selectResultArbitrary, fc.boolean(), (params, result, isLoading) => {
      const orderDataSpy = jest.fn<JSX.Element, unknown[]>().mockReturnValue(<>ordered data</>)

      render(
        <SelectContainer result={result} params={params} isLoading={isLoading} onParamsChange={jest.fn()}>
          <SelectOrderedData as={orderDataSpy} />
        </SelectContainer>
      )

      expect(omit(orderDataSpy.mock.calls[0][0] as Record<string, unknown>, ['onOrderChange'])).toEqual({
        data: result.items,
        isLoading,
        ordering: params.orderBy,
      })
    })
  )
})

test('On change from sorting pass through onChangeParams', () => {
  fc.assert(
    fc.property(
      selectParamsArbitrary,
      selectResultArbitrary,
      fc.boolean(),
      orderByArbitrary,
      (params, result, isLoading, newOrder) => {
        const paramsSpy = jest.fn()
        const orderSpy = jest.fn<JSX.Element, unknown[]>().mockReturnValue(<>pages</>)
        render(
          <SelectContainer result={result} params={params} isLoading={isLoading} onParamsChange={paramsSpy}>
            <SelectOrderedData as={orderSpy} />
          </SelectContainer>
        )
        const sortingOnChange = (orderSpy.mock.calls[0][0] as Record<
          'onOrderChange',
          (p: Record<string, string | null>) => void
        >).onOrderChange

        act(() => sortingOnChange(newOrder))

        expect(paramsSpy).toHaveBeenCalledWith({ ...params, orderBy: newOrder })
      }
    )
  )
})
