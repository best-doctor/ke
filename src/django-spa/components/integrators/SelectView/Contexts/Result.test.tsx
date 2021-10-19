import React, { PropsWithChildren } from 'react'
import fc from 'fast-check'
import { renderHook } from '@testing-library/react-hooks'

import { SelectResultProvider, useSelectResult } from './Result'

const resultArbitrary = fc.record({
  items: fc.array(fc.anything()),
  total: fc.nat(),
})

const isLoadingArbitrary = fc.boolean()

test('useSelectResult get correct value from context', () => {
  fc.assert(
    fc.property(resultArbitrary, isLoadingArbitrary, (selectResult, isLoading) => {
      const wrapper = ({ children }: PropsWithChildren<{}>): JSX.Element => (
        <SelectResultProvider result={selectResult} status={{ isLoading }}>
          {children}
        </SelectResultProvider>
      )

      const { result } = renderHook(() => useSelectResult(), { wrapper })

      expect(result.current).toEqual({ result: selectResult, status: { isLoading } })
    })
  )
})
