import React from 'react'
import { fc, testProp } from 'jest-fast-check'
import { render, act } from '@testing-library/react'
import { omit } from '@utils/Dicts'

import { SelectViewContainer } from './SelectViewContainer'
import { SelectFilters } from './SelectFilters'

import { selectParamsArbitrary, selectResultArbitrary, filtersArbitrary } from './fixtures'

testProp(
  'Use component from `as`-props',
  [selectParamsArbitrary, selectResultArbitrary, fc.boolean(), fc.lorem()],
  (params, result, isLoading, display) => {
    const filtersSpy = jest.fn().mockReturnValue(display)

    const { getByText } = render(
      <SelectViewContainer result={result} params={params} isLoading={isLoading} onParamsChange={jest.fn()}>
        <SelectFilters as={filtersSpy} />
      </SelectViewContainer>
    )

    expect(filtersSpy).toBeCalledTimes(1)
    expect(getByText(display)).toBeInTheDocument()
  }
)

testProp(
  'Pass correct props to filters component',
  [selectParamsArbitrary, selectResultArbitrary, fc.boolean()],
  (params, result, isLoading) => {
    const filtersSpy = jest.fn<JSX.Element, unknown[]>().mockReturnValue(<>filters</>)

    render(
      <SelectViewContainer result={result} params={params} isLoading={isLoading} onParamsChange={jest.fn()}>
        <SelectFilters as={filtersSpy} />
      </SelectViewContainer>
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
      <SelectViewContainer result={result} params={params} isLoading={isLoading} onParamsChange={paramsSpy}>
        <SelectFilters as={filtersSpy} />
      </SelectViewContainer>
    )
    const filtersOnChange = (filtersSpy.mock.calls[0][0] as Record<'onChange', (p: Record<string, unknown>) => void>)
      .onChange

    act(() => filtersOnChange(newFilters))

    expect(paramsSpy).toHaveBeenCalledWith({ ...params, filters: newFilters })
  }
)
