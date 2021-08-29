import React from 'react'
import fc from 'fast-check'
import { render, act } from '@testing-library/react'
import { omit } from '@utils/Dicts'

import { SelectContainer } from './SelectContainer'
import { SelectPages } from './SelectPages'

import { selectParamsArbitrary, selectResultArbitrary } from './fixtures'

test('Use component from `as`-props', () => {
  fc.assert(
    fc.property(
      selectParamsArbitrary,
      selectResultArbitrary,
      fc.boolean(),
      fc.lorem(),
      (params, result, isLoading, display) => {
        const paginationSpy = jest.fn().mockReturnValue(display)

        const { getByText } = render(
          <SelectContainer result={result} params={params} isLoading={isLoading} onParamsChange={jest.fn()}>
            <SelectPages as={paginationSpy} />
          </SelectContainer>
        )

        expect(paginationSpy).toBeCalledTimes(1)
        expect(getByText(display)).toBeInTheDocument()
      }
    )
  )
})

test('Pass correct props to pagination component', () => {
  fc.assert(
    fc.property(selectParamsArbitrary, selectResultArbitrary, fc.boolean(), (params, result, isLoading) => {
      const paginationSpy = jest.fn<JSX.Element, unknown[]>().mockReturnValue(<>pages</>)

      render(
        <SelectContainer result={result} params={params} isLoading={isLoading} onParamsChange={jest.fn()}>
          <SelectPages as={paginationSpy} />
        </SelectContainer>
      )

      expect(omit(paginationSpy.mock.calls[0][0] as Record<string, unknown>, ['onChange'])).toEqual({
        value: params.pagination.page,
        totalCount: result.total,
      })
    })
  )
})

test('On change from pagination pass through onChangeParams', () => {
  fc.assert(
    fc.property(
      selectParamsArbitrary,
      selectResultArbitrary,
      fc.boolean(),
      fc.nat(),
      (params, result, isLoading, newPage) => {
        const paramsSpy = jest.fn()
        const paginationSpy = jest.fn<JSX.Element, unknown[]>().mockReturnValue(<>pages</>)
        render(
          <SelectContainer result={result} params={params} isLoading={isLoading} onParamsChange={paramsSpy}>
            <SelectPages as={paginationSpy} />
          </SelectContainer>
        )
        const paginationOnChange = (paginationSpy.mock.calls[0][0] as Record<'onChange', (p: number) => void>).onChange

        act(() => paginationOnChange(newPage))

        expect(paramsSpy).toHaveBeenCalledWith({ ...params, pagination: { page: newPage } })
      }
    )
  )
})
