import React from 'react'
import { fc, testProp } from 'jest-fast-check'
import { render, act, cleanup } from '@testing-library/react'
import { omit } from '@utils/Dicts'

import { SelectViewContainer } from './SelectViewContainer'
import { SelectPages } from './SelectPages'

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
          const paginationSpy = jest.fn().mockReturnValue(display)

          const { getByText } = render(
            <SelectViewContainer result={result} params={params} isLoading={isLoading} onParamsChange={jest.fn()}>
              <SelectPages as={paginationSpy} />
            </SelectViewContainer>
          )

          expect(paginationSpy).toBeCalledTimes(1)
          expect(getByText(display)).toBeInTheDocument()
        }
      )
      .afterEach(cleanup)
  )
})

testProp(
  'Pass correct props to pagination component',
  [selectParamsArbitrary, selectResultArbitrary, fc.boolean()],
  (params, result, isLoading) => {
    const paginationSpy = jest.fn<JSX.Element, unknown[]>().mockReturnValue(<>pages</>)

    render(
      <SelectViewContainer result={result} params={params} isLoading={isLoading} onParamsChange={jest.fn()}>
        <SelectPages as={paginationSpy} />
      </SelectViewContainer>
    )

    expect(omit(paginationSpy.mock.calls[0][0] as Record<string, unknown>, ['onChange'])).toEqual({
      value: params.pagination.page,
      totalCount: result.total,
    })
  }
)

testProp(
  'On change from pagination pass through onChangeParams',
  [selectParamsArbitrary, selectResultArbitrary, fc.boolean(), fc.nat()],
  (params, result, isLoading, newPage) => {
    const paramsSpy = jest.fn()
    const paginationSpy = jest.fn<JSX.Element, unknown[]>().mockReturnValue(<>pages</>)
    render(
      <SelectViewContainer result={result} params={params} isLoading={isLoading} onParamsChange={paramsSpy}>
        <SelectPages as={paginationSpy} />
      </SelectViewContainer>
    )
    const paginationOnChange = (paginationSpy.mock.calls[0][0] as Record<'onChange', (p: number) => void>).onChange

    act(() => paginationOnChange(newPage))

    expect(paramsSpy).toHaveBeenCalledWith({ ...params, pagination: { page: newPage } })
  }
)
