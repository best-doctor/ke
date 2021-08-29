import React from 'react'
import fc from 'fast-check'
import { render } from '@testing-library/react'

import { SelectContainer } from './SelectContainer'
import { SelectData } from './SelectData'

import { selectParamsArbitrary, selectResultArbitrary } from './fixtures'

test('Use component from `as`-props', () => {
  fc.assert(
    fc.property(selectParamsArbitrary, selectResultArbitrary, fc.boolean(), (params, result, isLoading) => {
      const dataSpy = jest.fn().mockReturnValue('data')

      render(
        <SelectContainer result={result} params={params} isLoading={isLoading} onParamsChange={jest.fn()}>
          <SelectData as={dataSpy} />
        </SelectContainer>
      )

      expect(dataSpy).toBeCalledTimes(1)
    })
  )
})

test('Pass correct props to data component', () => {
  fc.assert(
    fc.property(selectParamsArbitrary, selectResultArbitrary, fc.boolean(), (params, result, isLoading) => {
      const dataSpy = jest.fn().mockReturnValue('data')

      render(
        <SelectContainer result={result} params={params} isLoading={isLoading} onParamsChange={jest.fn()}>
          <SelectData as={dataSpy} />
        </SelectContainer>
      )

      expect(dataSpy).toHaveBeenCalledWith(
        {
          data: result.items,
          isLoading,
        },
        {}
      )
    })
  )
})
