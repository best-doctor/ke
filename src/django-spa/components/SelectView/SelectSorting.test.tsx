import React from 'react'
import fc from 'fast-check'
import { render, act } from '@testing-library/react'
import { omit } from '@utils/Dicts'

import { SelectView } from './SelectView'
import { SelectSorting } from './SelectSorting'

import { selectParamsArbitrary, selectResultArbitrary, orderByArbitrary } from './fixtures'

test('Use component from `as`-props', () => {
  fc.assert(
    fc.property(selectParamsArbitrary, selectResultArbitrary, fc.boolean(), (params, result, isLoading) => {
      const orderSpy = jest.fn().mockReturnValue('order')

      render(
        <SelectView result={result} params={params} isLoading={isLoading} onParamsChange={jest.fn()}>
          <SelectSorting as={orderSpy} />
        </SelectView>
      )

      expect(orderSpy).toBeCalledTimes(1)
    })
  )
})

test('Pass correct props to sorting component', () => {
  fc.assert(
    fc.property(selectParamsArbitrary, selectResultArbitrary, fc.boolean(), (params, result, isLoading) => {
      const orderSpy = jest.fn<JSX.Element, unknown[]>().mockReturnValue(<>order</>)

      render(
        <SelectView result={result} params={params} isLoading={isLoading} onParamsChange={jest.fn()}>
          <SelectSorting as={orderSpy} />
        </SelectView>
      )

      expect(omit(orderSpy.mock.calls[0][0] as Record<string, unknown>, ['onChange'])).toEqual({
        value: params.orderBy,
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
          <SelectView result={result} params={params} isLoading={isLoading} onParamsChange={paramsSpy}>
            <SelectSorting as={orderSpy} />
          </SelectView>
        )
        const sortingOnChange = (orderSpy.mock.calls[0][0] as Record<
          'onChange',
          (p: Record<string, string | null>) => void
        >).onChange

        act(() => sortingOnChange(newOrder))

        expect(paramsSpy).toHaveBeenCalledWith({ ...params, orderBy: newOrder })
      }
    )
  )
})
