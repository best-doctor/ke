import React, { FC } from 'react'
import { testProp } from 'jest-fast-check'
import { render } from '@testing-library/react'
import { expectType } from 'tsd'

import { filtersContext } from './contexts'
import { filtersArbitrary } from './fixtures'
import { Predefined } from './Predefined'

testProp('Компонент пробрасывает в целевой ожидаемые данные из контекста', [filtersArbitrary], (filters) => {
  const onChangeSpy = jest.fn()
  const targetSpy = jest.fn().mockReturnValue('TEST')

  render(
    <filtersContext.Provider value={[filters, onChangeSpy]}>
      <Predefined as={targetSpy} />
    </filtersContext.Provider>
  )

  expect(targetSpy).toHaveBeenCalledTimes(1)
  expect(targetSpy).toHaveBeenCalledWith({ value: filters, onChange: onChangeSpy }, {})
})

describe('Корректность типов', () => {
  test('Ожидаем целевой компонент со всеми обязательными props', () => {
    expectType<
      FC<{
        as: FC<{
          value: unknown
          onChange: (f: unknown) => undefined
        }>
      }>
    >(Predefined)
  })

  test('Требуем дополнительные обязательные props компонента, если есть', () => {
    expectType<
      FC<{
        as: FC<{
          value: unknown
          onChange: (f: unknown) => undefined
          add: number
        }>
        add: number
      }>
    >(Predefined)
  })
})
