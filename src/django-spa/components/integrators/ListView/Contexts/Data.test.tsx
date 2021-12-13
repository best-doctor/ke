import React, { PropsWithChildren } from 'react'
import fc from 'fast-check'
import { renderHook } from '@testing-library/react-hooks'

import { ListDataProvider, useListData } from './Data'

const dataArbitrary = fc.record({
  items: fc.array(fc.anything()),
  total: fc.nat(),
})

const isLoadingArbitrary = fc.boolean()

test('useListData get correct value from context', () => {
  fc.assert(
    fc.property(dataArbitrary, isLoadingArbitrary, (listData, isLoading) => {
      const wrapper = ({ children }: PropsWithChildren<{}>): JSX.Element => (
        <ListDataProvider data={listData} status={{ isLoading }}>
          {children}
        </ListDataProvider>
      )

      const { result } = renderHook(() => useListData(), { wrapper })

      expect(result.current).toEqual({ data: listData, status: { isLoading } })
    })
  )
})
