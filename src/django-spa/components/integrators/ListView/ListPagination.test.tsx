import React from 'react'
import { fc, testProp } from 'jest-fast-check'
import { render, act, cleanup } from '@testing-library/react'
import { omit } from '@utils/dicts'

import { ListView } from './ListView'
import { ListPagination } from './ListPagination'

import { listParamsArbitrary, listDataArbitrary } from './fixtures'

test('Use component from `as`-props', () => {
  fc.assert(
    fc
      .property(
        listParamsArbitrary,
        listDataArbitrary,
        fc.boolean(),
        fc.lorem(),
        (params, data, isLoading, display) => {
          const paginationSpy = jest.fn().mockReturnValue(display)

          const { getByText } = render(
            <ListView data={data} params={params} isLoading={isLoading} onParamsChange={jest.fn()}>
              <ListPagination as={paginationSpy} />
            </ListView>
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
  [listParamsArbitrary, listDataArbitrary, fc.boolean()],
  (params, data, isLoading) => {
    const paginationSpy = jest.fn<JSX.Element, unknown[]>().mockReturnValue(<>pages</>)

    render(
      <ListView data={data} params={params} isLoading={isLoading} onParamsChange={jest.fn()}>
        <ListPagination as={paginationSpy} />
      </ListView>
    )

    expect(omit(paginationSpy.mock.calls[0][0] as Record<string, unknown>, ['onChange'])).toEqual({
      value: params.pagination.page,
      totalCount: Math.ceil((data?.total ?? 0) / params.pagination.perPage),
    })
  }
)

testProp(
  'On change from pagination pass through onChangeParams',
  [listParamsArbitrary, listDataArbitrary, fc.boolean(), fc.nat()],
  (params, data, isLoading, newPage) => {
    const paramsSpy = jest.fn()
    const paginationSpy = jest.fn<JSX.Element, unknown[]>().mockReturnValue(<>pages</>)
    render(
      <ListView data={data} params={params} isLoading={isLoading} onParamsChange={paramsSpy}>
        <ListPagination as={paginationSpy} />
      </ListView>
    )
    const paginationOnChange = (paginationSpy.mock.calls[0][0] as Record<'onChange', (p: number) => void>).onChange

    act(() => paginationOnChange(newPage))

    expect(paramsSpy).toHaveBeenCalledWith({
      ...params,
      pagination: { page: newPage, perPage: params.pagination.perPage },
    })
  }
)
