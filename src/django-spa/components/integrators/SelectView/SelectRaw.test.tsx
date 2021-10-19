import React from 'react'
import fc from 'fast-check'
import { cleanup, render } from '@testing-library/react'

import { SelectView } from './SelectView'
import { SelectRaw } from './SelectRaw'

import { selectParamsArbitrary, selectResultArbitrary } from './fixtures'

test('Use render function from `children`-props', () => {
  fc.assert(
    fc
      .property(
        selectParamsArbitrary,
        selectResultArbitrary,
        fc.boolean(),
        fc.lorem(),
        (params, result, isLoading, display) => {
          const renderSpy = jest.fn().mockReturnValue(display)
          const onParamsChangeSpy = jest.fn()

          const { getByText } = render(
            <SelectView result={result} params={params} isLoading={isLoading} onParamsChange={onParamsChangeSpy}>
              <SelectRaw>{renderSpy}</SelectRaw>
            </SelectView>
          )

          expect(renderSpy).toBeCalledTimes(1)
          expect(renderSpy).toHaveBeenCalledWith({
            result,
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
