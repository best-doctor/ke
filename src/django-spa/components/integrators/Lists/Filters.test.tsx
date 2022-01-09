import React, { FC } from 'react'
import { fc, testProp } from 'jest-fast-check'
import { render } from '@testing-library/react'
import { expectType } from 'tsd'

import { paramsArbitrary, statusCtxArbitrary } from './fixtures'
import { paramsContext, statusContext } from './contexts'
import { Filters } from './Filters'

testProp(
  'Пробрасываем корректные данные из контекстов',
  [paramsArbitrary, statusCtxArbitrary, fc.dictionary(fc.string(), fc.anything())],
  (params, statusCtx, changedFilters) => {
    const targetSpy = jest.fn().mockReturnValue('TEST')
    const onChangeParamsSpy = jest.fn()

    render(
      <paramsContext.Provider value={[params, onChangeParamsSpy]}>
        <statusContext.Provider value={statusCtx}>
          <Filters as={targetSpy} />
        </statusContext.Provider>
      </paramsContext.Provider>
    )
    const calledProps = targetSpy.mock.calls[0][0]
    const { filters, isLoading, onChange } = calledProps
    onChange(changedFilters)

    expect(targetSpy).toHaveBeenCalledTimes(1)
    expect(filters).toBe(params.filters)
    expect(isLoading).toBe(statusCtx.isLoading)
    expect(onChangeParamsSpy).toHaveBeenCalledTimes(1)
    expect(onChangeParamsSpy).toHaveBeenCalledWith({ ...params, filters: changedFilters })
  }
)

describe('Корректность типов', () => {
  test('Ожидаем целевой компонент со всеми обязательными props', () => {
    expectType<
      FC<{
        as: FC<{
          filters: unknown
          onChange: (f: unknown) => undefined
        }>
      }>
    >(Filters)
  })

  test('Требуем дополнительные обязательные props компонента, если есть', () => {
    expectType<
      FC<{
        as: FC<{
          filters: unknown
          onChange: (f: unknown) => undefined
          add: number
        }>
        add: number
      }>
    >(Filters)
  })
})
