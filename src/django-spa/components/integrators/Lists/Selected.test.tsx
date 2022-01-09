import React, { FC } from 'react'
import { testProp } from 'jest-fast-check'
import { render } from '@testing-library/react'
import { expectType } from 'tsd'

import { dataCtxArbitrary, selectedArbitrary, statusCtxArbitrary } from './fixtures'
import { dataContext, statusContext, selectedContext } from './contexts'
import { Selected } from './Selected'

testProp(
  'Пробрасываем корректные данные из контекстов',
  [dataCtxArbitrary, statusCtxArbitrary, selectedArbitrary],
  (dataCtx, statusCtx, selected) => {
    const targetSpy = jest.fn().mockReturnValue('TEST')
    const onSelectedChangeSpy = jest.fn()

    render(
      <dataContext.Provider value={dataCtx}>
        <selectedContext.Provider value={[selected, onSelectedChangeSpy]}>
          <statusContext.Provider value={statusCtx}>
            <Selected as={targetSpy} />
          </statusContext.Provider>
        </selectedContext.Provider>
      </dataContext.Provider>
    )

    expect(targetSpy).toHaveBeenCalledTimes(1)
    expect(targetSpy).toHaveBeenCalledWith(
      {
        total: dataCtx.total,
        isLoading: statusCtx.isLoading,
        selected,
        onSelectedChange: onSelectedChangeSpy,
      },
      {}
    )
  }
)

describe('Корректность типов', () => {
  test('Ожидаем целевой компонент со всеми обязательными props', () => {
    expectType<
      FC<{
        as: FC<{
          selected: string[]
          total?: number
          onSelectedChange?: (s: unknown[]) => void
          isLoading?: boolean
        }>
      }>
    >(Selected)
  })

  test('Требуем дополнительные обязательные props компонента, если есть', () => {
    expectType<
      FC<{
        as: FC<{ selected: string[]; add: number }>
        add: number
      }>
    >(Selected)
  })
})
