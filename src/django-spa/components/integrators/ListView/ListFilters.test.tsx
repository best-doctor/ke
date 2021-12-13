import React from 'react'
import { fc, testProp } from 'jest-fast-check'
import { render, act, cleanup } from '@testing-library/react'
import { omit } from '@utils/dicts'

import { ListView } from './ListView'
import { ListFilters } from './ListFilters'

import { listParamsArbitrary, listDataArbitrary, filtersArbitrary } from './fixtures'

test('Use component from `as`-props', () => {
  fc.assert(
    fc
      .property(
        listParamsArbitrary,
        listDataArbitrary,
        fc.boolean(),
        fc.lorem(),
        (params, data, isLoading, display) => {
          const filtersSpy = jest.fn().mockReturnValue(display)

          const { getByText } = render(
            <ListView data={data} params={params} isLoading={isLoading} onParamsChange={jest.fn()}>
              <ListFilters as={filtersSpy} />
            </ListView>
          )

          expect(filtersSpy).toBeCalledTimes(1)
          expect(getByText(display)).toBeInTheDocument()
        }
      )
      .afterEach(cleanup)
  )
})

testProp(
  'Pass correct props to filters component',
  [listParamsArbitrary, listDataArbitrary, fc.boolean()],
  (params, data, isLoading) => {
    const filtersSpy = jest.fn<JSX.Element, unknown[]>().mockReturnValue(<>filters</>)

    render(
      <ListView data={data} params={params} isLoading={isLoading} onParamsChange={jest.fn()}>
        <ListFilters as={filtersSpy} />
      </ListView>
    )

    expect(omit(filtersSpy.mock.calls[0][0] as Record<string, unknown>, ['onChange'])).toEqual({
      value: params.filters,
    })
  }
)

testProp(
  'On change from filters pass through onChangeParams',
  [listParamsArbitrary, listDataArbitrary, fc.boolean(), filtersArbitrary],
  (params, data, isLoading, newFilters) => {
    const paramsSpy = jest.fn()
    const filtersSpy = jest.fn<JSX.Element, unknown[]>().mockReturnValue(<>filters</>)
    render(
      <ListView data={data} params={params} isLoading={isLoading} onParamsChange={paramsSpy}>
        <ListFilters as={filtersSpy} />
      </ListView>
    )
    const filtersOnChange = (filtersSpy.mock.calls[0][0] as Record<'onChange', (p: Record<string, unknown>) => void>)
      .onChange

    act(() => filtersOnChange(newFilters))

    expect(paramsSpy).toHaveBeenCalledWith({ ...params, filters: newFilters })
  }
)
