import React from 'react'
import { fc, testProp } from 'jest-fast-check'
import { render, act, cleanup } from '@testing-library/react'
import { omit } from '@utils/dicts'

import { SelectView } from './SelectView'
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
            <SelectView result={result} params={params} isLoading={isLoading} onParamsChange={jest.fn()}>
              <SelectPages as={paginationSpy} />
            </SelectView>
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
      <SelectView result={result} params={params} isLoading={isLoading} onParamsChange={jest.fn()}>
        <SelectPages as={paginationSpy} />
      </SelectView>
    )

    expect(omit(paginationSpy.mock.calls[0][0] as Record<string, unknown>, ['onChange'])).toEqual({
      value: params.pagination.page,
      totalCount: Math.ceil((result?.total ?? 0) / params.pagination.perPage),
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
      <SelectView result={result} params={params} isLoading={isLoading} onParamsChange={paramsSpy}>
        <SelectPages as={paginationSpy} />
      </SelectView>
    )
    const paginationOnChange = (paginationSpy.mock.calls[0][0] as Record<'onChange', (p: number) => void>).onChange

    act(() => paginationOnChange(newPage))

    expect(paramsSpy).toHaveBeenCalledWith({
      ...params,
      pagination: { page: newPage, perPage: params.pagination.perPage },
    })
  }
)
