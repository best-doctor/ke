import React, { FC } from 'react'
import { expectType } from 'tsd'
import { render } from '@testing-library/react'
import { testProp, fc } from 'jest-fast-check'
import { omit } from '@utils/dicts'

import { extendDistributedContext } from './extendDistributedContext'
import { DistributedContextControl } from './types'

const basePropsRecord = {
  first: fc.float(),
  second: fc.boolean(),
  children: fc.string({ minLength: 5 }),
}

const extContextDescArbitrary = fc
  .dictionary(
    fc.lorem({ mode: 'words' }).filter((key) => !Object.keys(basePropsRecord).includes(key)),
    fc.anything()
  )
  .filter(
    (desc) =>
      Object.keys(desc)
        .map((key) => key.trim())
        .filter(Boolean).length > 2
  )

const basePropsArbitrary = fc.record(basePropsRecord)

function getBaseControl(): DistributedContextControl<BaseRootProps> {
  return [jest.fn().mockReturnValue(<></>), jest.fn().mockReturnValue(() => <></>)]
}

testProp(
  'Рендер расширенного корневого компонента рендерит и базовый',
  [extContextDescArbitrary, basePropsArbitrary],
  (extContextDesc, baseProps) => {
    const baseDistributedContext = getBaseControl()
    const [Root] = extendDistributedContext(baseDistributedContext, extContextDesc)

    render(<Root {...baseProps} {...extContextDesc} />)

    const [baseRootSpy] = baseDistributedContext
    expect(baseRootSpy).toHaveBeenCalledTimes(1)
    expect(baseRootSpy).toHaveBeenCalledWith(baseProps, {})
  }
)

testProp(
  'В прокси-функцию прокидываются все пропсы корневого-компонента',
  [extContextDescArbitrary, basePropsArbitrary],
  (extContextDesc, baseProps) => {
    const baseDistributedContext = getBaseControl()
    const proxySpy = jest.fn().mockReturnValue({})
    const [Root] = extendDistributedContext(baseDistributedContext, extContextDesc, proxySpy)

    render(<Root {...baseProps} {...extContextDesc} />)

    expect(proxySpy).toHaveBeenCalledTimes(1)
    expect(proxySpy).toHaveBeenCalledWith({ ...omit(baseProps, ['children']), ...extContextDesc })
  }
)

describe('Корректные типы результата', () => {
  const baseDistributedContext: DistributedContextControl<BaseRootProps> = [jest.fn(), jest.fn()]

  test('Корневого компонента без прокси-функции', () => {
    const [Root] = extendDistributedContext(baseDistributedContext, { third: 'test' })

    expectType<FC<BaseRootProps & { third: string }>>(Root)
  })

  test('Корневого компонента c прокси-функцией переопределяющей props', () => {
    const [Root] = extendDistributedContext(
      baseDistributedContext,
      { third: 'test' },
      ({ a, b, c }: { a: number; b: boolean; c: string }) => ({
        first: a,
        second: b,
        third: c,
      })
    )

    expectType<FC<{ a: number; b: boolean; c: string }>>(Root)
  })

  test('Фабричной функции полиморфных consumer-компонентов для одного ключа', () => {
    const [, maker] = extendDistributedContext(baseDistributedContext, { third: 'test' })
    const subA: FC<{ third: string; d: number }> = jest.fn().mockReturnValue('SubA')
    const C = maker(['third'])

    expectType<FC<{ as: typeof subA; d: number }>>(C)
  })

  test('Фабричной функции полиморфных consumer-компонентов для одного нескольких ключей', () => {
    const [, maker] = extendDistributedContext(baseDistributedContext, { third: 'test' })
    const subAB: FC<{ first: number; third: string; d: number }> = jest.fn().mockReturnValue('SubAB')

    const C = maker(['first', 'third'])

    expectType<FC<{ as: typeof subAB; d: number }>>(C)
  })

  test('Фабричной функции полиморфных consumer-компонентов c прокси', () => {
    const [, maker] = extendDistributedContext(baseDistributedContext, { third: 'test' })
    const subZ: FC<{ z: boolean; d: number }> = jest.fn().mockReturnValue('SubZ')
    const proxy: (data: { first: number; third: string }) => { z: boolean } = jest.fn()

    const C = maker(['first', 'third'], proxy)

    expectType<FC<{ as: typeof subZ; d: number }>>(C)
  })
})

interface BaseRootProps {
  first: number
  second: boolean
}
