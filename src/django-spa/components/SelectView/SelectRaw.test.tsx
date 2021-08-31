import React from 'react'
import { fc, testProp } from 'jest-fast-check'
import { render } from '@testing-library/react'

import { SelectViewContainer } from './SelectViewContainer'
import { SelectRaw } from './SelectRaw'

import { selectParamsArbitrary, selectResultArbitrary } from './fixtures'

testProp(
  'Use render function from `children`-props',
  [selectParamsArbitrary, selectResultArbitrary, fc.boolean(), fc.lorem()],
  (params, result, isLoading, display) => {
    const renderSpy = jest.fn().mockReturnValue(display)
    const onParamsChangeSpy = jest.fn()

    const { getByText } = render(
      <SelectViewContainer result={result} params={params} isLoading={isLoading} onParamsChange={onParamsChangeSpy}>
        <SelectRaw>{renderSpy}</SelectRaw>
      </SelectViewContainer>
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
