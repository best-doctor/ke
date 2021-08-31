import React from 'react'
import { fc, testProp } from 'jest-fast-check'
import { render, act, cleanup } from '@testing-library/react'
import { omit } from '@utils/Dicts'

import { SelectViewContainer } from './SelectViewContainer'
import { SelectOrderedData } from './SelectOrderedData'

import { selectParamsArbitrary, selectResultArbitrary, orderByArbitrary } from './fixtures'

test('Use component from `as`-props', () => {
  fc.assert(
    fc
      .property(
        selectParamsArbitrary,
        selectResultArbitrary,
        fc.boolean(),
        fc.lorem(),
        (params, result, isLoading, display) => {
          const orderDataSpy = jest.fn().mockReturnValue(display)

          const { getByText } = render(
            <SelectViewContainer result={result} params={params} isLoading={isLoading} onParamsChange={jest.fn()}>
              <SelectOrderedData as={orderDataSpy} />
            </SelectViewContainer>
          )

          expect(orderDataSpy).toBeCalledTimes(1)
          expect(getByText(display)).toBeInTheDocument()
        }
      )
      .afterEach(cleanup)
  )
})

testProp(
  'Pass correct props to ordered data component',
  [selectParamsArbitrary, selectResultArbitrary, fc.boolean()],
  (params, result, isLoading) => {
    const orderDataSpy = jest.fn<JSX.Element, unknown[]>().mockReturnValue(<>ordered data</>)

    render(
      <SelectViewContainer result={result} params={params} isLoading={isLoading} onParamsChange={jest.fn()}>
        <SelectOrderedData as={orderDataSpy} />
      </SelectViewContainer>
    )

    expect(omit(orderDataSpy.mock.calls[0][0] as Record<string, unknown>, ['onOrderChange'])).toEqual({
      data: result.items,
      isLoading,
      ordering: params.orderBy,
    })
  }
)

testProp(
  'On change from sorting pass through onChangeParams',
  [selectParamsArbitrary, selectResultArbitrary, fc.boolean(), orderByArbitrary],
  (params, result, isLoading, newOrder) => {
    const paramsSpy = jest.fn()
    const orderSpy = jest.fn<JSX.Element, unknown[]>().mockReturnValue(<>pages</>)
    render(
      <SelectViewContainer result={result} params={params} isLoading={isLoading} onParamsChange={paramsSpy}>
        <SelectOrderedData as={orderSpy} />
      </SelectViewContainer>
    )
    const sortingOnChange = (orderSpy.mock.calls[0][0] as Record<
      'onOrderChange',
      (p: Record<string, string | null>) => void
    >).onOrderChange

    act(() => sortingOnChange(newOrder))

    expect(paramsSpy).toHaveBeenCalledWith({ ...params, orderBy: newOrder })
  }
)
