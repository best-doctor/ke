import React from 'react'
import fc from 'fast-check'
import { render } from '@testing-library/react'

import { SelectContainer } from './SelectContainer'
import { SelectRaw } from './SelectRaw'

import { selectParamsArbitrary, selectResultArbitrary } from './fixtures'

test('Use render function from `children`-props', () => {
  fc.assert(
    fc.property(selectParamsArbitrary, selectResultArbitrary, fc.boolean(), (params, result, isLoading) => {
      const renderSpy = jest.fn().mockReturnValue('data')
      const onParamsChangeSpy = jest.fn()

      render(
        <SelectContainer result={result} params={params} isLoading={isLoading} onParamsChange={onParamsChangeSpy}>
          <SelectRaw>{renderSpy}</SelectRaw>
        </SelectContainer>
      )

      expect(renderSpy).toBeCalledTimes(1)
      expect(renderSpy).toHaveBeenCalledWith({
        result,
        status: { isLoading },
        params,
        onParamsChange: onParamsChangeSpy,
      })
    })
  )
})
