import React from 'react'
import { fc, testProp } from 'jest-fast-check'
import { render, act, cleanup } from '@testing-library/react'
import { omit } from '@utils/dicts'

import { ListView } from './ListView'
import { ListOrderedData } from './ListOrderedData'

import { listParamsArbitrary, listDataArbitrary, orderByArbitrary } from './fixtures'

test('Use component from `as`-props', () => {
  fc.assert(
    fc
      .property(
        listParamsArbitrary,
        listDataArbitrary,
        fc.boolean(),
        fc.lorem(),
        (params, data, isLoading, display) => {
          const orderDataSpy = jest.fn().mockReturnValue(display)

          const { getByText } = render(
            <ListView data={data} params={params} isLoading={isLoading} onParamsChange={jest.fn()}>
              <ListOrderedData as={orderDataSpy} />
            </ListView>
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
  [listParamsArbitrary, listDataArbitrary, fc.boolean()],
  (params, data, isLoading) => {
    const orderDataSpy = jest.fn<JSX.Element, unknown[]>().mockReturnValue(<>ordered data</>)

    render(
      <ListView data={data} params={params} isLoading={isLoading} onParamsChange={jest.fn()}>
        <ListOrderedData as={orderDataSpy} />
      </ListView>
    )

    expect(omit(orderDataSpy.mock.calls[0][0] as Record<string, unknown>, ['onOrderChange'])).toEqual({
      data: data.items,
      isLoading,
      ordering: params.orderBy,
    })
  }
)

testProp(
  'On change from sorting pass through onChangeParams',
  [listParamsArbitrary, listDataArbitrary, fc.boolean(), orderByArbitrary],
  (params, data, isLoading, newOrder) => {
    const paramsSpy = jest.fn()
    const orderSpy = jest.fn<JSX.Element, unknown[]>().mockReturnValue(<>pages</>)
    render(
      <ListView data={data} params={params} isLoading={isLoading} onParamsChange={paramsSpy}>
        <ListOrderedData as={orderSpy} />
      </ListView>
    )
    const sortingOnChange = (
      orderSpy.mock.calls[0][0] as Record<'onOrderChange', (p: Record<string, string | null>) => void>
    ).onOrderChange

    act(() => sortingOnChange(newOrder))

    expect(paramsSpy).toHaveBeenCalledWith({ ...params, orderBy: newOrder })
  }
)
