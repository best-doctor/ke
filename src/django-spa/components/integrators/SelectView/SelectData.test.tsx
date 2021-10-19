import React from 'react'
import { fc, testProp } from 'jest-fast-check'
import { render, cleanup } from '@testing-library/react'

import { SelectView } from './SelectView'
import { SelectData } from './SelectData'

import { selectParamsArbitrary, selectResultArbitrary } from './fixtures'

test('Use component from `as`-props', () => {
  fc.assert(
    fc
      .property(
        selectParamsArbitrary,
        selectResultArbitrary,
        fc.boolean(),
        fc.lorem(),
        (params, result, isLoading, display) => {
          const dataSpy = jest.fn().mockReturnValue(display)

          const { getByText } = render(
            <SelectView result={result} params={params} isLoading={isLoading} onParamsChange={jest.fn()}>
              <SelectData as={dataSpy} />
            </SelectView>
          )

          expect(dataSpy).toBeCalledTimes(1)
          expect(getByText(display)).toBeInTheDocument()
        }
      )
      .afterEach(cleanup)
  )
})

testProp(
  'Pass correct props to data component',
  [selectParamsArbitrary, selectResultArbitrary, fc.boolean()],
  (params, result, isLoading) => {
    const dataSpy = jest.fn().mockReturnValue('data')

    render(
      <SelectView result={result} params={params} isLoading={isLoading} onParamsChange={jest.fn()}>
        <SelectData as={dataSpy} />
      </SelectView>
    )

    expect(dataSpy).toHaveBeenCalledWith(
      {
        data: result.items,
        isLoading,
      },
      {}
    )
  }
)
