import React from 'react'
import { fc, testProp } from 'jest-fast-check'
import { cleanup, render } from '@testing-library/react'

import { filtersArbitrary, handleFiltersArbitrary } from './fixtures'
import { WherePanel } from './WherePanel'
import { WhereFilters } from './WhereFilters'

test('Use component from `as`-props', () => {
  fc.assert(
    fc
      .property(filtersArbitrary, handleFiltersArbitrary, fc.lorem(), (filters, handle, display) => {
        const filtersSpy = jest.fn().mockReturnValue(display)

        const { getByText } = render(
          <WherePanel filters={filters} onFiltersChange={handle}>
            <WhereFilters as={filtersSpy} />
          </WherePanel>
        )

        expect(filtersSpy).toBeCalledTimes(1)
        expect(getByText(display)).toBeInTheDocument()
      })
      .afterEach(cleanup)
  )
})

testProp('Pass correct props to filters component', [filtersArbitrary, handleFiltersArbitrary], (filters, handle) => {
  const filtersSpy = jest.fn<JSX.Element, unknown[]>().mockReturnValue(<>filters</>)

  render(
    <WherePanel filters={filters} onFiltersChange={handle}>
      <WhereFilters as={filtersSpy} />
    </WherePanel>
  )

  expect(filtersSpy).toHaveBeenCalledWith(
    {
      value: filters,
      onChange: handle,
    },
    {}
  )
})
