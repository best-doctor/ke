import React, { PropsWithChildren } from 'react'
import { testProp } from 'jest-fast-check'
import { renderHook } from '@testing-library/react-hooks'

import { WhereProvider, useWhereFilters } from './WherePanel.context'
import { filtersArbitrary, handleFiltersArbitrary } from './fixtures'

testProp(
  'useWhereContext got data from WhereProvider',
  [filtersArbitrary, handleFiltersArbitrary],
  (filtersValue, handleChange) => {
    const wrapper = ({ children }: PropsWithChildren<{}>): JSX.Element => (
      <WhereProvider filters={filtersValue} onFiltersChange={handleChange}>
        {children}
      </WhereProvider>
    )

    const { result } = renderHook(() => useWhereFilters(), { wrapper })

    expect(result.current).toEqual([filtersValue, handleChange])
  }
)
