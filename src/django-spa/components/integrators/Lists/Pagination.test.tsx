import React, { FC } from 'react'
import { fc, testProp } from 'jest-fast-check'
import { render } from '@testing-library/react'
import { expectType } from 'tsd'

import { dataCtxArbitrary, paramsArbitrary, statusCtxArbitrary } from './fixtures'
import { dataContext, paramsContext, statusContext } from './contexts'
import { Pagination } from './Pagination'

testProp(
  'Пробрасываем корректные данные из контекстов',
  [dataCtxArbitrary, paramsArbitrary, statusCtxArbitrary, fc.nat()],
  (dataCtx, params, statusCtx, changedPage) => {
    const targetSpy = jest.fn().mockReturnValue('TEST')
    const onChangeParamsSpy = jest.fn()

    render(
      <dataContext.Provider value={dataCtx}>
        <paramsContext.Provider value={[params, onChangeParamsSpy]}>
          <statusContext.Provider value={statusCtx}>
            <Pagination as={targetSpy} />
          </statusContext.Provider>
        </paramsContext.Provider>
      </dataContext.Provider>
    )
    const calledProps = targetSpy.mock.calls[0][0]
    const { currentPage, totalPages, isLoading, onChange } = calledProps
    onChange(changedPage)

    expect(targetSpy).toHaveBeenCalledTimes(1)
    expect(currentPage).toBe(params.pagination.currentPage)
    expect(totalPages).toBe(Math.ceil(dataCtx.total / params.pagination.itemsPerPage))
    expect(isLoading).toBe(statusCtx.isLoading)
    expect(onChangeParamsSpy).toHaveBeenCalledTimes(1)
    expect(onChangeParamsSpy).toHaveBeenCalledWith({
      ...params,
      pagination: { ...params.pagination, currentPage: changedPage },
    })
  }
)

describe('Корректность типов', () => {
  test('Ожидаем целевой компонент со всеми обязательными props', () => {
    expectType<
      FC<{
        as: FC<{
          currentPage: number
          totalPages: number
          onChange: (f: number) => undefined
        }>
      }>
    >(Pagination)
  })

  test('Требуем дополнительные обязательные props компонента, если есть', () => {
    expectType<
      FC<{
        as: FC<{
          currentPage: number
          totalPages: number
          onChange: (f: number) => undefined
          add: number
        }>
        add: number
      }>
    >(Pagination)
  })
})
