import React from 'react'
import { fc, testProp } from 'jest-fast-check'
import { render, act, cleanup } from '@testing-library/react'
import { omit } from '@utils/dicts'

import { ListView } from './ListView'
import { ListOrder } from './ListOrder'

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
          const orderSpy = jest.fn().mockReturnValue(display)

          const { getByText } = render(
            <ListView data={data} params={params} isLoading={isLoading} onParamsChange={jest.fn()}>
              <ListOrder as={orderSpy} />
            </ListView>
          )

          expect(orderSpy).toBeCalledTimes(1)
          expect(getByText(display)).toBeInTheDocument()
        }
      )
      .afterEach(cleanup)
  )
})

testProp(
  'Pass correct props to sorting component',
  [listParamsArbitrary, listDataArbitrary, fc.boolean()],
  (params, data, isLoading) => {
    const orderSpy = jest.fn<JSX.Element, unknown[]>().mockReturnValue(<>filters</>)

    render(
      <ListView data={data} params={params} isLoading={isLoading} onParamsChange={jest.fn()}>
        <ListOrder as={orderSpy} />
      </ListView>
    )

    expect(omit(orderSpy.mock.calls[0][0] as Record<string, unknown>, ['onChange'])).toEqual({
      value: params.orderBy,
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
        <ListOrder as={orderSpy} />
      </ListView>
    )
    const sortingOnChange = (
      orderSpy.mock.calls[0][0] as Record<'onChange', (p: Record<string, string | null>) => void>
    ).onChange

    act(() => sortingOnChange(newOrder))

    expect(paramsSpy).toHaveBeenCalledWith({ ...params, orderBy: newOrder })
  }
)
