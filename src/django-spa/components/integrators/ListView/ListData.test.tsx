import React from 'react'
import { fc, testProp } from 'jest-fast-check'
import { render, cleanup } from '@testing-library/react'

import { ListView } from './ListView'
import { ListData } from './ListData'

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
          const dataSpy = jest.fn().mockReturnValue(display)

          const { getByText } = render(
            <ListView data={data} params={params} isLoading={isLoading} onParamsChange={jest.fn()}>
              <ListData as={dataSpy} />
            </ListView>
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
  [listParamsArbitrary, listDataArbitrary, fc.boolean()],
  (params, data, isLoading) => {
    const dataSpy = jest.fn().mockReturnValue('data')

    render(
      <ListView data={data} params={params} isLoading={isLoading} onParamsChange={jest.fn()}>
        <ListData as={dataSpy} />
      </ListView>
    )

    expect(dataSpy).toHaveBeenCalledWith(
      {
        data: data.items,
        isLoading,
      },
      {}
    )
  }
)
