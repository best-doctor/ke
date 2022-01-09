import React, { FC } from 'react'
import { testProp } from 'jest-fast-check'
import { render } from '@testing-library/react'
import { expectType } from 'tsd'

import { dataCtxArbitrary, statusCtxArbitrary } from './fixtures'
import { dataContext, statusContext } from './contexts'
import { Data } from './Data'

testProp(
  'Пробрасываем корректные данные из контекстов',
  [dataCtxArbitrary, statusCtxArbitrary],
  (dataCtx, statusCtx) => {
    const targetSpy = jest.fn().mockReturnValue('TEST')

    render(
      <dataContext.Provider value={dataCtx}>
        <statusContext.Provider value={statusCtx}>
          <Data as={targetSpy} />
        </statusContext.Provider>
      </dataContext.Provider>
    )

    expect(targetSpy).toHaveBeenCalledTimes(1)
    expect(targetSpy).toHaveBeenCalledWith(
      {
        items: dataCtx.items,
        isLoading: statusCtx.isLoading,
        isNotLoaded: statusCtx.isNotLoaded,
      },
      {}
    )
  }
)

describe('Корректность типов', () => {
  test('Ожидаем целевой компонент со всеми обязательными props', () => {
    expectType<
      FC<{
        as: FC<{ items: string[]; isLoading?: boolean }>
      }>
    >(Data)
  })

  test('Требуем дополнительные обязательные props компонента, если есть', () => {
    expectType<
      FC<{
        as: FC<{ items: string[]; add: number }>
        add: number
      }>
    >(Data)
  })
})
