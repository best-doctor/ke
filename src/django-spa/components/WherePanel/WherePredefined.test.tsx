import React from 'react'
import { fc, testProp } from 'jest-fast-check'
import { cleanup, render } from '@testing-library/react'

import { filtersArbitrary, handleFiltersArbitrary } from './fixtures'
import { WherePanel } from './WherePanel'
import { WherePredefined } from './WherePredefined'

test('Use component from `as`-props', () => {
  fc.assert(
    fc
      .property(filtersArbitrary, handleFiltersArbitrary, fc.lorem(), (filters, handle, display) => {
        const predefinedSpy = jest.fn().mockReturnValue(display)

        const { getByText } = render(
          <WherePanel filters={filters} onFiltersChange={handle}>
            <WherePredefined as={predefinedSpy} />
          </WherePanel>
        )

        expect(predefinedSpy).toBeCalledTimes(1)
        expect(getByText(display)).toBeInTheDocument()
      })
      .afterEach(cleanup)
  )
})

testProp(
  'Pass correct props to predefined component',
  [filtersArbitrary, handleFiltersArbitrary],
  (filters, handle) => {
    const predefinedSpy = jest.fn<JSX.Element, unknown[]>().mockReturnValue(<>predefined</>)

    render(
      <WherePanel filters={filters} onFiltersChange={handle}>
        <WherePredefined as={predefinedSpy} />
      </WherePanel>
    )

    expect(predefinedSpy).toHaveBeenCalledWith(
      {
        value: filters,
        onChange: handle,
      },
      {}
    )
  }
)
