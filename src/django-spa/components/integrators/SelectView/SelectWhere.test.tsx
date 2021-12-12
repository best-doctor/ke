import React from 'react'
import { fc, testProp } from 'jest-fast-check'
import { render, act, cleanup } from '@testing-library/react'
import { omit } from '@utils/dicts'

import { SelectView } from './SelectView'
import { SelectWhere } from './SelectWhere'

import { selectParamsArbitrary, selectResultArbitrary, filtersArbitrary } from './fixtures'

test('Use component from `as`-props', () => {
  fc.assert(
    fc
      .property(
        selectParamsArbitrary,
        selectResultArbitrary,
        fc.boolean(),
        fc.lorem(),
        (params, result, isLoading, display) => {
          const filtersSpy = jest.fn().mockReturnValue(display)

          const { getByText } = render(
            <SelectView result={result} params={params} isLoading={isLoading} onParamsChange={jest.fn()}>
              <SelectWhere as={filtersSpy} />
            </SelectView>
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
  [selectParamsArbitrary, selectResultArbitrary, fc.boolean()],
  (params, result, isLoading) => {
    const filtersSpy = jest.fn<JSX.Element, unknown[]>().mockReturnValue(<>filters</>)

    render(
      <SelectView result={result} params={params} isLoading={isLoading} onParamsChange={jest.fn()}>
        <SelectWhere as={filtersSpy} />
      </SelectView>
    )

    expect(omit(filtersSpy.mock.calls[0][0] as Record<string, unknown>, ['onChange'])).toEqual({
      value: params.filters,
    })
  }
)

testProp(
  'On change from filters pass through onChangeParams',
  [selectParamsArbitrary, selectResultArbitrary, fc.boolean(), filtersArbitrary],
  (params, result, isLoading, newFilters) => {
    const paramsSpy = jest.fn()
    const filtersSpy = jest.fn<JSX.Element, unknown[]>().mockReturnValue(<>filters</>)
    render(
      <SelectView result={result} params={params} isLoading={isLoading} onParamsChange={paramsSpy}>
        <SelectWhere as={filtersSpy} />
      </SelectView>
    )
    const filtersOnChange = (filtersSpy.mock.calls[0][0] as Record<'onChange', (p: Record<string, unknown>) => void>)
      .onChange

    act(() => filtersOnChange(newFilters))

    expect(paramsSpy).toHaveBeenCalledWith({ ...params, filters: newFilters })
  }
)
