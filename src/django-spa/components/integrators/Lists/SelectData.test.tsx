import React, { FC } from 'react'
import { testProp } from 'jest-fast-check'
import { render } from '@testing-library/react'
import { expectType } from 'tsd'

import { dataCtxArbitrary, selectedArbitrary, statusCtxArbitrary } from './fixtures'
import { dataContext, statusContext, selectedContext } from './contexts'
import { SelectData } from './SelectData'

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
            <SelectData as={targetSpy} />
          </statusContext.Provider>
        </selectedContext.Provider>
      </dataContext.Provider>
    )

    expect(targetSpy).toHaveBeenCalledTimes(1)
    expect(targetSpy).toHaveBeenCalledWith(
      {
        items: dataCtx.items,
        isLoading: statusCtx.isLoading,
        isNotLoaded: statusCtx.isNotLoaded,
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
          items: string[]
          selected: string[]
          onSelectedChange: (s: unknown[]) => void
          isLoading?: boolean
        }>
      }>
    >(SelectData)
  })

  test('Требуем дополнительные обязательные props компонента, если есть', () => {
    expectType<
      FC<{
        as: FC<{ items: string[]; add: number }>
        add: number
      }>
    >(SelectData)
  })
})
