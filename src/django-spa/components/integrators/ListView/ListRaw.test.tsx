import React from 'react'
import fc from 'fast-check'
import { cleanup, render } from '@testing-library/react'

import { ListView } from './ListView'
import { ListRaw } from './ListRaw'

import { listParamsArbitrary, listDataArbitrary } from './fixtures'

test('Use render function from `children`-props', () => {
  fc.assert(
    fc
      .property(
        listParamsArbitrary,
        listDataArbitrary,
        fc.boolean(),
        fc.lorem(),
        (params, data, isLoading, display) => {
          const renderSpy = jest.fn().mockReturnValue(display)
          const onParamsChangeSpy = jest.fn()

          const { getByText } = render(
            <ListView data={data} params={params} isLoading={isLoading} onParamsChange={onParamsChangeSpy}>
              <ListRaw>{renderSpy}</ListRaw>
            </ListView>
          )

          expect(renderSpy).toBeCalledTimes(1)
          expect(renderSpy).toHaveBeenCalledWith({
            data,
            status: { isLoading },
            params,
            onParamsChange: onParamsChangeSpy,
          })
          expect(getByText(display)).toBeInTheDocument()
        }
      )
      .afterEach(cleanup)
  )
})
