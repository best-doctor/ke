import React, { FC } from 'react'
import { fc, testProp } from 'jest-fast-check'
import { render } from '@testing-library/react'
import { expectType } from 'tsd'

import { paramsArbitrary, statusCtxArbitrary } from './fixtures'
import { paramsContext, statusContext } from './contexts'
import { Order } from './Order'

testProp(
  'Пробрасываем корректные данные из контекстов',
  [paramsArbitrary, statusCtxArbitrary, fc.dictionary(fc.string(), fc.anything())],
  (params, statusCtx, changedOrder) => {
    const targetSpy = jest.fn().mockReturnValue('TEST')
    const onChangeParamsSpy = jest.fn()

    render(
      <paramsContext.Provider value={[params, onChangeParamsSpy]}>
        <statusContext.Provider value={statusCtx}>
          <Order as={targetSpy} />
        </statusContext.Provider>
      </paramsContext.Provider>
    )

    // TODO: Разобраться с типами и поправить
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const calledProps = targetSpy.mock.calls[0][0]
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { order, isLoading, onChange } = calledProps
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    onChange(changedOrder)

    expect(targetSpy).toHaveBeenCalledTimes(1)
    expect(order).toBe(params.order)
    expect(isLoading).toBe(statusCtx.isLoading)
    expect(onChangeParamsSpy).toHaveBeenCalledTimes(1)
    expect(onChangeParamsSpy).toHaveBeenCalledWith({ ...params, order: changedOrder })
  }
)

describe('Корректность типов', () => {
  test('Ожидаем целевой компонент со всеми обязательными props', () => {
    expectType<
      FC<{
        as: FC<{
          order: unknown
          onChange: (f: unknown) => undefined
        }>
      }>
    >(Order)
  })

  test('Требуем дополнительные обязательные props компонента, если есть', () => {
    expectType<
      FC<{
        as: FC<{
          order: unknown
          onChange: (f: unknown) => undefined
          add: number
        }>
        add: number
      }>
    >(Order)
  })
})
