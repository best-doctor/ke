import React from 'react'
import { fc, testProp } from 'jest-fast-check'
import { render, act, cleanup } from '@testing-library/react'
import { omit } from '@utils/dicts'

import { SelectView } from './SelectView'
import { SelectOrder } from './SelectOrder'

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
          const orderSpy = jest.fn().mockReturnValue(display)

          const { getByText } = render(
            <SelectView result={result} params={params} isLoading={isLoading} onParamsChange={jest.fn()}>
              <SelectOrder as={orderSpy} />
            </SelectView>
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
  [selectParamsArbitrary, selectResultArbitrary, fc.boolean()],
  (params, result, isLoading) => {
    const orderSpy = jest.fn<JSX.Element, unknown[]>().mockReturnValue(<>filters</>)

    render(
      <SelectView result={result} params={params} isLoading={isLoading} onParamsChange={jest.fn()}>
        <SelectOrder as={orderSpy} />
      </SelectView>
    )

    expect(omit(orderSpy.mock.calls[0][0] as Record<string, unknown>, ['onChange'])).toEqual({
      value: params.orderBy,
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
      <SelectView result={result} params={params} isLoading={isLoading} onParamsChange={paramsSpy}>
        <SelectOrder as={orderSpy} />
      </SelectView>
    )
    const sortingOnChange = (
      orderSpy.mock.calls[0][0] as Record<'onChange', (p: Record<string, string | null>) => void>
    ).onChange

    act(() => sortingOnChange(newOrder))

    expect(paramsSpy).toHaveBeenCalledWith({ ...params, orderBy: newOrder })
  }
)
